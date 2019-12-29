/**
 * @summary     DataTables
 * @description Paginate, search and sort HTML tables
 * @version     1.10.0-dev
 * @file        jquery.dataTables.js
 * @author      Allan Jardine (www.sprymedia.co.uk)
 * @contact     www.sprymedia.co.uk/contact
 *
 * @copyright Copyright 2008-2012 Allan Jardine, all rights reserved.
 *
 * This source file is free software, under either the GPL v2 license or a
 * BSD style license, available at:
 *   http://datatables.net/license_gpl2
 *   http://datatables.net/license_bsd
 *
 * This source file is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 * or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.
 *
 * For details please refer to: http://www.datatables.net
 */

/*jslint evil: true, undef: true, browser: true */
/*globals $,require,jQuery,define,_fnExternApiFunc,_fnInitialise,_fnInitComplete,_fnLanguageCompat,_fnAddColumn,_fnColumnOptions,_fnAddData,_fnCreateTr,_fnGatherData,_fnBuildHead,_fnDrawHead,_fnDraw,_fnReDraw,_fnAjaxUpdate,_fnAjaxParameters,_fnAjaxUpdateDraw,_fnAddOptionsHtml,_fnFeatureHtmlTable,_fnScrollDraw,_fnAdjustColumnSizing,_fnFeatureHtmlFilter,_fnFilterComplete,_fnFilterCustom,_fnFilterColumn,_fnFilter,_fnBuildSearchArray,_fnBuildSearchRow,_fnFilterCreateSearch,_fnDataToSearch,_fnSort,_fnSortAttachListener,_fnSortingClasses,_fnFeatureHtmlPaginate,_fnPageChange,_fnFeatureHtmlInfo,_fnUpdateInfo,_fnFeatureHtmlLength,_fnFeatureHtmlProcessing,_fnProcessingDisplay,_fnVisibleToColumnIndex,_fnColumnIndexToVisible,_fnNodeToDataIndex,_fnVisbleColumns,_fnCalculateEnd,_fnConvertToWidth,_fnCalculateColumnWidths,_fnScrollingWidthAdjust,_fnGetWidestNode,_fnGetMaxLenString,_fnStringToCss,_fnDetectType,_fnSettingsFromNode,_fnGetDataMaster,_fnGetTrNodes,_fnGetTdNodes,_fnEscapeRegex,_fnDeleteIndex,_fnColumnOrdering,_fnLog,_fnClearTable,_fnSaveState,_fnLoadState,_fnDetectHeader,_fnGetUniqueThs,_fnScrollBarWidth,_fnApplyToChildren,_fnMap,_fnGetRowData,_fnGetCellData,_fnSetCellData,_fnGetObjectDataFn,_fnSetObjectDataFn,_fnApplyColumnDefs,_fnBindAction,_fnCallbackReg,_fnCallbackFire,_fnNodeToColumnIndex,_fnInfoMacros,_fnBrowserDetect,_fnGetColumns,_fnHungarianMap,_fnCamelToHungarian,_fnBuildAjax,_fnAjaxDataSrc*/

(/** @lends <global> */function( window, document, undefined ) {

(function( factory ) {
	"use strict";

	// Define as an D module if possible
	if ( typeof define === 'function' && define.amd )
	{
		define( ['jquery'], factory );
	}
	/* Define using browser globals otherwise
	 * Prevent multiple instantiations if the script is loaded twice
	 */
	else if ( jQuery && !jQuery.fn.dataTable )
	{
		factory( jQuery );
	}
}
(/** @lends <global> */function( $ ) {
	"use strict";

	/**
	 * DataTables is a plug-in for the jQuery Javascript library. It is a highly
	 * flexible tool, based upon the foundations of progressive enhancement,
	 * which will add advanced interaction controls to any HTML table. For a
	 * full list of features please refer to
	 * [DataTables.net](href="http://datatables.net).
	 *
	 * Note that the `DataTable` object is not a global variable but is aliased
	 * to `jQuery.fn.DataTable` and `jQuery.fn.dataTable` through which it may
	 * be  accessed.
	 *
	 *  @class
	 *  @param {object} [init={}] Configuration object for DataTables. Options
	 *    are defined by {@link DataTable.defaults}
	 *  @requires jQuery 1.3+
	 *
	 *  @example
	 *    // Basic initialisation
	 *    $(document).ready( function {
	 *      $('#example').dataTable();
	 *    } );
	 *
	 *  @example
	 *    // Initialisation with configuration options - in this case, disable
	 *    // pagination and sorting.
	 *    $(document).ready( function {
	 *      $('#example').dataTable( {
	 *        "paginate": false,
	 *        "sort": false
	 *      } );
	 *    } );
	 */
	var DataTable;

	
	
	/**
	 * Create a mapping object that allows camel case parameters to be looked up
	 * for their Hungarian counterparts. The mapping is stored in a private
	 * parameter called `_hungaianMap` which can be accessed on the source object.
	 *  @param {object} o 
	 *  @memberof DataTable#oApi
	 */
	function _fnHungarianMap ( o )
	{
		var
			hungarian = 'a aa ao as b fn i m o s ',
			match,
			newKey,
			map = {};
	
		$.each( o, function (key, val) {
			match = key.match(/^([^A-Z]+?)([A-Z])/);
	
			if ( match && hungarian.indexOf(match[1]+' ') !== -1 )
			{
				newKey = key.replace( match[0], match[2].toLowerCase() );
				map[ newKey ] = key;
	
				if ( match[1] === 'o' )
				{
					_fnHungarianMap( o[key] );
				}
			}
		} );
	
		o._hungaianMap = map;
	}
	
	
	/**
	 * Convert from camel case parameters to Hungarian, based on a Hungarian map
	 * created by _fnHungarianMap.
	 *  @param {object} src The model object which holds all parameters that can be
	 *    mapped.
	 *  @param {object} user The object to convert from camel case to Hungarian.
	 *  @param {boolean} force When set to `true`, properties which already have a
	 *    Hungarian value in the `user` object will be overwritten. Otherwise they
	 *    won't be.
	 *  @memberof DataTable#oApi
	 */
	function _fnCamelToHungarian ( src, user, force )
	{
		if ( ! src._hungaianMap )
		{
			_fnHungarianMap( src );
		}
	
		var hungarianKey;
	
		$.each( user, function (key, val) {
			hungarianKey = src._hungaianMap[ key ];
	
			if ( hungarianKey !== undefined && (force || user[hungarianKey] === undefined) )
			{
				user[hungarianKey] = user[ key ];
	
				if ( hungarianKey.charAt(0) === 'o' )
				{
					_fnCamelToHungarian( src[hungarianKey], user[key] );
				}
			}
		} );
	}
	
	
	/**
	 * Language compatibility - when certain options are given, and others aren't, we
	 * need to duplicate the values over, in order to provide backwards compatibility
	 * with older language files.
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnLanguageCompat( oLanguage )
	{
		var oDefaults = DataTable.defaults.oLanguage;
	
		/* Backwards compatibility - if there is no sEmptyTable given, then use the same as
		 * sZeroRecords - assuming that is given.
		 */
		if ( !oLanguage.sEmptyTable && oLanguage.sZeroRecords &&
			oDefaults.sEmptyTable === "No data available in table" )
		{
			_fnMap( oLanguage, oLanguage, 'sZeroRecords', 'sEmptyTable' );
		}
	
		/* Likewise with loading records */
		if ( !oLanguage.sLoadingRecords && oLanguage.sZeroRecords &&
			oDefaults.sLoadingRecords === "Loading..." )
		{
			_fnMap( oLanguage, oLanguage, 'sZeroRecords', 'sLoadingRecords' );
		}
	}
	
	
	/**
	 * Browser feature detection for capabilities, quirks
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnBrowserDetect( oSettings )
	{
		// Scrolling feature / quirks detection
		var n = $(
			'<div style="position:absolute; top:0; left:0; height:1px; width:1px; overflow:hidden">'+
				'<div style="position:absolute; top:1px; left:1px; width:100px; overflow:scroll;">'+
					'<div id="DT_BrowserTest" style="width:100%; height:10px;"></div>'+
				'</div>'+
			'</div>')[0];
	
		document.body.appendChild( n );
		// IE6/7 will oversize a width 100% element inside a scrolling element, to
		// include the width of the scrollbar, while other browsers ensure the inner
		// element is contained without forcing scrolling
		oSettings.oBrowser.bScrollOversize = $('#DT_BrowserTest', n)[0].offsetWidth === 100 ? true : false;
	
		// In rtl text layout, some browsers (most, but not all) will place the
		// scrollbar on the left, rather than the right.
		oSettings.oBrowser.bScrollbarLeft = $('#DT_BrowserTest', n).offset().left !== 1 ? true : false;
		document.body.removeChild( n );
	}
	
	
	/**
	 * Add a column to the list used for the table with default values
	 *  @param {object} oSettings dataTables settings object
	 *  @param {node} nTh The th element for this column
	 *  @memberof DataTable#oApi
	 */
	function _fnAddColumn( oSettings, nTh )
	{
		var oDefaults = DataTable.defaults.column;
		var iCol = oSettings.aoColumns.length;
		var oCol = $.extend( {}, DataTable.models.oColumn, oDefaults, {
			"sSortingClass": oSettings.oClasses.sSortable,
			"sSortingClassJUI": oSettings.oClasses.sSortJUI,
			"nTh": nTh ? nTh : document.createElement('th'),
			"sTitle":    oDefaults.sTitle    ? oDefaults.sTitle    : nTh ? nTh.innerHTML : '',
			"aDataSort": oDefaults.aDataSort ? oDefaults.aDataSort : [iCol],
			"mData": oDefaults.mData ? oDefaults.oDefaults : iCol
		} );
		oSettings.aoColumns.push( oCol );
		
		/* Add a column specific filter */
		if ( oSettings.aoPreSearchCols[ iCol ] === undefined || oSettings.aoPreSearchCols[ iCol ] === null )
		{
			oSettings.aoPreSearchCols[ iCol ] = $.extend( {}, DataTable.models.oSearch );
		}
		else
		{
			var oPre = oSettings.aoPreSearchCols[ iCol ];
			
			/* Don't require that the user must specify bRegex, bSmart or bCaseInsensitive */
			if ( oPre.bRegex === undefined )
			{
				oPre.bRegex = true;
			}
			
			if ( oPre.bSmart === undefined )
			{
				oPre.bSmart = true;
			}
			
			if ( oPre.bCaseInsensitive === undefined )
			{
				oPre.bCaseInsensitive = true;
			}
		}
		
		/* Use the column options function to initialise classes etc */
		_fnColumnOptions( oSettings, iCol, null );
	}
	
	
	/**
	 * Apply options for a column
	 *  @param {object} oSettings dataTables settings object
	 *  @param {int} iCol column index to consider
	 *  @param {object} oOptions object with sType, bVisible and bSearchable etc
	 *  @memberof DataTable#oApi
	 */
	function _fnColumnOptions( oSettings, iCol, oOptions )
	{
		var oCol = oSettings.aoColumns[ iCol ];
		
		/* User specified column options */
		if ( oOptions !== undefined && oOptions !== null )
		{
			// Map camel case parameters to their Hungarian counterparts
			_fnCamelToHungarian( DataTable.defaults.column, oOptions );
			
			/* Backwards compatibility for mDataProp */
			if ( oOptions.mDataProp !== undefined && !oOptions.mData )
			{
				oOptions.mData = oOptions.mDataProp;
			}
	
			if ( oOptions.sType !== undefined )
			{
				oCol.sType = oOptions.sType;
				oCol._bAutoType = false;
			}
			
			$.extend( oCol, oOptions );
			_fnMap( oCol, oOptions, "sWidth", "sWidthOrig" );
	
			/* iDataSort to be applied (backwards compatibility), but aDataSort will take
			 * priority if defined
			 */
			if ( oOptions.iDataSort !== undefined )
			{
				oCol.aDataSort = [ oOptions.iDataSort ];
			}
			_fnMap( oCol, oOptions, "aDataSort" );
		}
	
		/* Cache the data get and set functions for speed */
		var mRender = oCol.mRender ? _fnGetObjectDataFn( oCol.mRender ) : null;
		var mData = _fnGetObjectDataFn( oCol.mData );
	
		oCol.fnGetData = function (oData, sSpecific) {
			var innerData = mData( oData, sSpecific );
	
			if ( oCol.mRender && (sSpecific && sSpecific !== '') )
			{
				return mRender( innerData, sSpecific, oData );
			}
			return innerData;
		};
		oCol.fnSetData = _fnSetObjectDataFn( oCol.mData );
		
		/* Feature sorting overrides column specific when off */
		if ( !oSettings.oFeatures.bSort )
		{
			oCol.bSortable = false;
		}
		
		/* Check that the class assignment is correct for sorting */
		if ( !oCol.bSortable ||
			 ($.inArray('asc', oCol.asSorting) == -1 && $.inArray('desc', oCol.asSorting) == -1) )
		{
			oCol.sSortingClass = oSettings.oClasses.sSortableNone;
			oCol.sSortingClassJUI = "";
		}
		else if ( $.inArray('asc', oCol.asSorting) == -1 && $.inArray('desc', oCol.asSorting) == -1 )
		{
			oCol.sSortingClass = oSettings.oClasses.sSortable;
			oCol.sSortingClassJUI = oSettings.oClasses.sSortJUI;
		}
		else if ( $.inArray('asc', oCol.asSorting) != -1 && $.inArray('desc', oCol.asSorting) == -1 )
		{
			oCol.sSortingClass = oSettings.oClasses.sSortableAsc;
			oCol.sSortingClassJUI = oSettings.oClasses.sSortJUIAscAllowed;
		}
		else if ( $.inArray('asc', oCol.asSorting) == -1 && $.inArray('desc', oCol.asSorting) != -1 )
		{
			oCol.sSortingClass = oSettings.oClasses.sSortableDesc;
			oCol.sSortingClassJUI = oSettings.oClasses.sSortJUIDescAllowed;
		}
	}
	
	
	/**
	 * Adjust the table column widths for new data. Note: you would probably want to 
	 * do a redraw after calling this function!
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnAdjustColumnSizing ( oSettings )
	{
		/* Not interested in doing column width calculation if auto-width is disabled */
		if ( oSettings.oFeatures.bAutoWidth === false )
		{
			return false;
		}
		
		_fnCalculateColumnWidths( oSettings );
		for ( var i=0 , iLen=oSettings.aoColumns.length ; i<iLen ; i++ )
		{
			oSettings.aoColumns[i].nTh.style.width = oSettings.aoColumns[i].sWidth;
		}
	}
	
	
	/**
	 * Covert the index of a visible column to the index in the data array (take account
	 * of hidden columns)
	 *  @param {object} oSettings dataTables settings object
	 *  @param {int} iMatch Visible column index to lookup
	 *  @returns {int} i the data index
	 *  @memberof DataTable#oApi
	 */
	function _fnVisibleToColumnIndex( oSettings, iMatch )
	{
		var aiVis = _fnGetColumns( oSettings, 'bVisible' );
	
		return typeof aiVis[iMatch] === 'number' ?
			aiVis[iMatch] :
			null;
	}
	
	
	/**
	 * Covert the index of an index in the data array and convert it to the visible
	 *   column index (take account of hidden columns)
	 *  @param {int} iMatch Column index to lookup
	 *  @param {object} oSettings dataTables settings object
	 *  @returns {int} i the data index
	 *  @memberof DataTable#oApi
	 */
	function _fnColumnIndexToVisible( oSettings, iMatch )
	{
		var aiVis = _fnGetColumns( oSettings, 'bVisible' );
		var iPos = $.inArray( iMatch, aiVis );
	
		return iPos !== -1 ? iPos : null;
	}
	
	
	/**
	 * Get the number of visible columns
	 *  @param {object} oSettings dataTables settings object
	 *  @returns {int} i the number of visible columns
	 *  @memberof DataTable#oApi
	 */
	function _fnVisbleColumns( oSettings )
	{
		return _fnGetColumns( oSettings, 'bVisible' ).length;
	}
	
	
	/**
	 * Get an array of column indexes that match a given property
	 *  @param {object} oSettings dataTables settings object
	 *  @param {string} sParam Parameter in aoColumns to look for - typically 
	 *    bVisible or bSearchable
	 *  @returns {array} Array of indexes with matched properties
	 *  @memberof DataTable#oApi
	 */
	function _fnGetColumns( oSettings, sParam )
	{
		var a = [];
	
		$.map( oSettings.aoColumns, function(val, i) {
			if ( val[sParam] ) {
				a.push( i );
			}
		} );
	
		return a;
	}
	
	
	/**
	 * Get the sort type based on an input string
	 *  @param {string} sData data we wish to know the type of
	 *  @returns {string} type (defaults to 'string' if no type can be detected)
	 *  @memberof DataTable#oApi
	 */
	function _fnDetectType( sData )
	{
		var aTypes = DataTable.ext.aTypes;
		var iLen = aTypes.length;
		
		for ( var i=0 ; i<iLen ; i++ )
		{
			var sType = aTypes[i]( sData );
			if ( sType !== null )
			{
				return sType;
			}
		}
		
		return 'string';
	}
	
	
	/**
	 * Get the column ordering that DataTables expects
	 *  @param {object} oSettings dataTables settings object
	 *  @returns {string} comma separated list of names
	 *  @memberof DataTable#oApi
	 */
	function _fnColumnOrdering ( oSettings )
	{
		var sNames = '';
		for ( var i=0, iLen=oSettings.aoColumns.length ; i<iLen ; i++ )
		{
			sNames += oSettings.aoColumns[i].sName+',';
		}
		if ( sNames.length == iLen )
		{
			return "";
		}
		return sNames.slice(0, -1);
	}
	
	
	/**
	 * Take the column definitions and static columns arrays and calculate how
	 * they relate to column indexes. The callback function will then apply the
	 * definition found for a column to a suitable configuration object.
	 *  @param {object} oSettings dataTables settings object
	 *  @param {array} aoColDefs The aoColumnDefs array that is to be applied
	 *  @param {array} aoCols The aoColumns array that defines columns individually
	 *  @param {function} fn Callback function - takes two parameters, the calculated
	 *    column index and the definition for that column.
	 *  @memberof DataTable#oApi
	 */
	function _fnApplyColumnDefs( oSettings, aoColDefs, aoCols, fn )
	{
		var i, iLen, j, jLen, k, kLen;
	
		// Column definitions with aTargets
		if ( aoColDefs )
		{
			/* Loop over the definitions array - loop in reverse so first instance has priority */
			for ( i=aoColDefs.length-1 ; i>=0 ; i-- )
			{
				/* Each definition can target multiple columns, as it is an array */
				var aTargets = aoColDefs[i].targets || aoColDefs[i].aTargets;
				if ( ! $.isArray( aTargets ) )
				{
					_fnLog( oSettings, 1, 'aTargets must be an array of targets, not a '+(typeof aTargets) );
				}
	
				for ( j=0, jLen=aTargets.length ; j<jLen ; j++ )
				{
					if ( typeof aTargets[j] === 'number' && aTargets[j] >= 0 )
					{
						/* Add columns that we don't yet know about */
						while( oSettings.aoColumns.length <= aTargets[j] )
						{
							_fnAddColumn( oSettings );
						}
	
						/* Integer, basic index */
						fn( aTargets[j], aoColDefs[i] );
					}
					else if ( typeof aTargets[j] === 'number' && aTargets[j] < 0 )
					{
						/* Negative integer, right to left column counting */
						fn( oSettings.aoColumns.length+aTargets[j], aoColDefs[i] );
					}
					else if ( typeof aTargets[j] === 'string' )
					{
						/* Class name matching on TH element */
						for ( k=0, kLen=oSettings.aoColumns.length ; k<kLen ; k++ )
						{
							if ( aTargets[j] == "_all" ||
							     $(oSettings.aoColumns[k].nTh).hasClass( aTargets[j] ) )
							{
								fn( k, aoColDefs[i] );
							}
						}
					}
				}
			}
		}
	
		// Statically defined columns array
		if ( aoCols )
		{
			for ( i=0, iLen=aoCols.length ; i<iLen ; i++ )
			{
				fn( i, aoCols[i] );
			}
		}
	}
	
	/**
	 * Add a data array to the table, creating DOM node etc. This is the parallel to 
	 * _fnGatherData, but for adding rows from a Javascript source, rather than a
	 * DOM source.
	 *  @param {object} oSettings dataTables settings object
	 *  @param {array} aData data array to be added
	 *  @param {node} [nTr] TR element to add to the table - optional. If not given,
	 *    DataTables will create a row automatically
	 *  @param {array} [anTds] Array of TD|TH elements for the row - must be given
	 *    if nTr is.
	 *  @returns {int} >=0 if successful (index of new aoData entry), -1 if failed
	 *  @memberof DataTable#oApi
	 */
	function _fnAddData ( oSettings, aDataIn, nTr, anTds )
	{
		var oCol;
		
		/* Create the object for storing information about this new row */
		var iRow = oSettings.aoData.length;
		var oData = $.extend( true, {}, DataTable.models.oRow );
		
		oData._aData = aDataIn;
		oSettings.aoData.push( oData );
	
		/* Create the cells */
		var nTd, sThisType;
		for ( var i=0, iLen=oSettings.aoColumns.length ; i<iLen ; i++ )
		{
			oCol = oSettings.aoColumns[i];
	
			_fnSetCellData( oSettings, iRow, i, _fnGetCellData( oSettings, iRow, i ) );
			
			/* See if we should auto-detect the column type */
			if ( oCol._bAutoType && oCol.sType != 'string' )
			{
				/* Attempt to auto detect the type - same as _fnGatherData() */
				var sVarType = _fnGetCellData( oSettings, iRow, i, 'type' );
				if ( sVarType !== null && sVarType !== '' )
				{
					sThisType = _fnDetectType( sVarType );
					if ( oCol.sType === null )
					{
						oCol.sType = sThisType;
					}
					else if ( oCol.sType != sThisType && oCol.sType != "html" )
					{
						/* String is always the 'fallback' option */
						oCol.sType = 'string';
					}
				}
			}
		}
		
		/* Add to the display array */
		oSettings.aiDisplayMaster.push( iRow );
	
		/* Create the DOM information */
		if ( !oSettings.oFeatures.bDeferRender )
		{
			_fnCreateTr( oSettings, iRow, nTr, anTds );
		}
	
		return iRow;
	}
	
	
	/**
	 * Add one or more TR elements to the table. Generally we'd expect to
	 * use this for reading data from a DOM sourced table, but it could be
	 * used for an TR element. Note that if a TR is given, it is used (i.e.
	 * it is not cloned).
	 *  @param {object} oSettings dataTables settings object
	 *  @param {array|node|jQuery} trs The TR element(s) to add to the table
	 *  @memberof DataTable#oApi
	 */
	function _fnAddTr( oSettings, trs )
	{
		// Allow an individual node to be passed in
		if ( ! trs instanceof $ ) {
			trs = $(trs);
		}
	
		trs.each( function () {
			var
				d = [],
				tds = [],
				td = this.firstChild,
				name;
	
			while ( td )
			{
				name = td.nodeName.toUpperCase();
				if ( name == "TD" || name == "TH" )
				{
					d.push( $.trim(td.innerHTML) );
					tds.push( td );
				}
				td = td.nextSibling;
			}
	
			_fnAddData( oSettings, d, this, tds );
		} );
	}
	
	
	/**
	 * Take a TR element and convert it to an index in aoData
	 *  @param {object} oSettings dataTables settings object
	 *  @param {node} n the TR element to find
	 *  @returns {int} index if the node is found, null if not
	 *  @memberof DataTable#oApi
	 */
	function _fnNodeToDataIndex( oSettings, n )
	{
		return (n._DT_RowIndex!==undefined) ? n._DT_RowIndex : null;
	}
	
	
	/**
	 * Take a TD element and convert it into a column data index (not the visible index)
	 *  @param {object} oSettings dataTables settings object
	 *  @param {int} iRow The row number the TD/TH can be found in
	 *  @param {node} n The TD/TH element to find
	 *  @returns {int} index if the node is found, -1 if not
	 *  @memberof DataTable#oApi
	 */
	function _fnNodeToColumnIndex( oSettings, iRow, n )
	{
		var anCells = _fnGetTdNodes( oSettings, iRow );
	
		for ( var i=0, iLen=oSettings.aoColumns.length ; i<iLen ; i++ )
		{
			if ( anCells[i] === n )
			{
				return i;
			}
		}
		return -1;
	}
	
	
	/**
	 * Get an array of data for a given row from the internal data cache
	 *  @param {object} oSettings dataTables settings object
	 *  @param {int} iRow aoData row id
	 *  @param {string} sSpecific data get type ('type' 'filter' 'sort')
	 *  @param {array} aiColumns Array of column indexes to get data from
	 *  @returns {array} Data array
	 *  @memberof DataTable#oApi
	 */
	function _fnGetRowData( oSettings, iRow, sSpecific, aiColumns )
	{
		var out = [];
		for ( var i=0, iLen=aiColumns.length ; i<iLen ; i++ )
		{
			out.push( _fnGetCellData( oSettings, iRow, aiColumns[i], sSpecific ) );
		}
		return out;
	}
	
	
	/**
	 * Get the data for a given cell from the internal cache, taking into account data mapping
	 *  @param {object} oSettings dataTables settings object
	 *  @param {int} iRow aoData row id
	 *  @param {int} iCol Column index
	 *  @param {string} sSpecific data get type ('display', 'type' 'filter' 'sort')
	 *  @returns {*} Cell data
	 *  @memberof DataTable#oApi
	 */
	function _fnGetCellData( oSettings, iRow, iCol, sSpecific )
	{
		var oCol = oSettings.aoColumns[iCol];
		var oData = oSettings.aoData[iRow]._aData;
		var sData = oCol.fnGetData( oData, sSpecific );
	
		if ( sData === undefined )
		{
			if ( oSettings.iDrawError != oSettings.iDraw && oCol.sDefaultContent === null )
			{
				_fnLog( oSettings, 0, "Requested unknown parameter "+
					(typeof oCol.mData=='function' ? '{mData function}' : "'"+oCol.mData+"'")+
					" from the data source for row "+iRow );
				oSettings.iDrawError = oSettings.iDraw;
			}
			return oCol.sDefaultContent;
		}
	
		/* When the data source is null, we can use default column data */
		if ( (sData === oData || sData === null) && oCol.sDefaultContent !== null )
		{
			sData = oCol.sDefaultContent;
		}
		else if ( typeof sData === 'function' )
		{
			// If the data source is a function, then we run it and use the return
			return sData();
		}
	
		if ( sData === null && sSpecific == 'display' )
		{
			return '';
		}
		return sData;
	}
	
	
	/**
	 * Set the value for a specific cell, into the internal data cache
	 *  @param {object} oSettings dataTables settings object
	 *  @param {int} iRow aoData row id
	 *  @param {int} iCol Column index
	 *  @param {*} val Value to set
	 *  @memberof DataTable#oApi
	 */
	function _fnSetCellData( oSettings, iRow, iCol, val )
	{
		var oCol = oSettings.aoColumns[iCol];
		var oData = oSettings.aoData[iRow]._aData;
	
		oCol.fnSetData( oData, val );
	}
	
	
	// Private variable that is used to match action syntax in the data property object
	var __reArray = /\[.*?\]$/;
	var __reFn = /\(\)$/;
	
	/**
	 * Split string on periods, taking into account escaped periods
	 * @param  {string} str String to split
	 * @return {array} Split string
	 */
	function _fnSplitObjNotation( str )
	{
		return $.map( str.match(/(\\.|[^\.])+/g), function ( s ) {
			return s.replace('\\.', '.');
		} );
	}
	
	
	/**
	 * Return a function that can be used to get data from a source object, taking
	 * into account the ability to use nested objects as a source
	 *  @param {string|int|function} mSource The data source for the object
	 *  @returns {function} Data get function
	 *  @memberof DataTable#oApi
	 */
	function _fnGetObjectDataFn( mSource )
	{
		if ( mSource === null )
		{
			/* Give an empty string for rendering / sorting etc */
			return function (data, type) {
				return data;
			};
		}
		else if ( typeof mSource === 'function' )
		{
			return function (data, type, extra) {
				return mSource( data, type, extra );
			};
		}
		else if ( typeof mSource === 'string' && (mSource.indexOf('.') !== -1 ||
			      mSource.indexOf('[') !== -1 || mSource.indexOf('(') !== -1) )
		{
			/* If there is a . in the source string then the data source is in a
			 * nested object so we loop over the data for each level to get the next
			 * level down. On each loop we test for undefined, and if found immediately
			 * return. This allows entire objects to be missing and sDefaultContent to
			 * be used if defined, rather than throwing an error
			 */
			var fetchData = function (data, type, src) {
				var a = _fnSplitObjNotation( src );
				var arrayNotation, funcNotation, out, innerSrc;
	
				if ( src !== "" )
				{
					for ( var i=0, iLen=a.length ; i<iLen ; i++ )
					{
						// Check if we are dealing with special notation
						arrayNotation = a[i].match(__reArray);
						funcNotation = a[i].match(__reFn);
	
						if ( arrayNotation )
						{
							// Array notation
							a[i] = a[i].replace(__reArray, '');
	
							// Condition allows simply [] to be passed in
							if ( a[i] !== "" ) {
								data = data[ a[i] ];
							}
							out = [];
							
							// Get the remainder of the nested object to get
							a.splice( 0, i+1 );
							innerSrc = a.join('.');
	
							// Traverse each entry in the array getting the properties requested
							for ( var j=0, jLen=data.length ; j<jLen ; j++ ) {
								out.push( fetchData( data[j], type, innerSrc ) );
							}
	
							// If a string is given in between the array notation indicators, that
							// is used to join the strings together, otherwise an array is returned
							var join = arrayNotation[0].substring(1, arrayNotation[0].length-1);
							data = (join==="") ? out : out.join(join);
	
							// The inner call to fetchData has already traversed through the remainder
							// of the source requested, so we exit from the loop
							break;
						}
						else if ( funcNotation )
						{
							// Function call
							a[i] = a[i].replace(__reFn, '');
							data = data[ a[i] ]();
							continue;
						}
	
						if ( data === null || data[ a[i] ] === undefined )
						{
							return undefined;
						}
						data = data[ a[i] ];
					}
				}
	
				return data;
			};
	
			return function (data, type) {
				return fetchData( data, type, mSource );
			};
		}
		else
		{
			/* Array or flat object mapping */
			return function (data, type) {
				return data[mSource];
			};
		}
	}
	
	
	/**
	 * Return a function that can be used to set data from a source object, taking
	 * into account the ability to use nested objects as a source
	 *  @param {string|int|function} mSource The data source for the object
	 *  @returns {function} Data set function
	 *  @memberof DataTable#oApi
	 */
	function _fnSetObjectDataFn( mSource )
	{
		if ( mSource === null )
		{
			/* Nothing to do when the data source is null */
			return function (data, val) {};
		}
		else if ( typeof mSource === 'function' )
		{
			return function (data, val) {
				mSource( data, 'set', val );
			};
		}
		else if ( typeof mSource === 'string' && (mSource.indexOf('.') !== -1 ||
			      mSource.indexOf('[') !== -1 || mSource.indexOf('(') !== -1) )
		{
			/* Like the get, we need to get data from a nested object */
			var setData = function (data, val, src) {
				var a = _fnSplitObjNotation( src ), b;
				var aLast = a[a.length-1];
				var arrayNotation, funcNotation, o, innerSrc;
	
				for ( var i=0, iLen=a.length-1 ; i<iLen ; i++ )
				{
					// Check if we are dealing with an array notation request
					arrayNotation = a[i].match(__reArray);
					funcNotation = a[i].match(__reFn);
	
					if ( arrayNotation )
					{
						a[i] = a[i].replace(__reArray, '');
						data[ a[i] ] = [];
						
						// Get the remainder of the nested object to set so we can recurse
						b = a.slice();
						b.splice( 0, i+1 );
						innerSrc = b.join('.');
	
						// Traverse each entry in the array setting the properties requested
						for ( var j=0, jLen=val.length ; j<jLen ; j++ )
						{
							o = {};
							setData( o, val[j], innerSrc );
							data[ a[i] ].push( o );
						}
	
						// The inner call to setData has already traversed through the remainder
						// of the source and has set the data, thus we can exit here
						return;
					}
					else if ( funcNotation )
					{
						// Function call
						a[i] = a[i].replace(__reFn, '');
						data = data[ a[i] ]( val );
					}
	
					// If the nested object doesn't currently exist - since we are
					// trying to set the value - create it
					if ( data[ a[i] ] === null || data[ a[i] ] === undefined )
					{
						data[ a[i] ] = {};
					}
					data = data[ a[i] ];
				}
	
				// Last item in the input - i.e, the actual set
				if ( aLast.match(__reFn ) )
				{
					// Function call
					data = data[ aLast.replace(__reFn, '') ]( val );
				}
				else
				{
					// If array notation is used, we just want to strip it and use the property name
					// and assign the value. If it isn't used, then we get the result we want anyway
					data[ aLast.replace(__reArray, '') ] = val;
				}
			};
	
			return function (data, val) {
				return setData( data, val, mSource );
			};
		}
		else
		{
			/* Array or flat object mapping */
			return function (data, val) {
				data[mSource] = val;
			};
		}
	}
	
	
	/**
	 * Return an array with the full table data
	 *  @param {object} oSettings dataTables settings object
	 *  @returns array {array} aData Master data array
	 *  @memberof DataTable#oApi
	 */
	function _fnGetDataMaster ( oSettings )
	{
		var aData = [];
		var iLen = oSettings.aoData.length;
		for ( var i=0 ; i<iLen; i++ )
		{
			aData.push( oSettings.aoData[i]._aData );
		}
		return aData;
	}
	
	
	/**
	 * Nuke the table
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnClearTable( oSettings )
	{
		oSettings.aoData.splice( 0, oSettings.aoData.length );
		oSettings.aiDisplayMaster.splice( 0, oSettings.aiDisplayMaster.length );
		oSettings.aiDisplay.splice( 0, oSettings.aiDisplay.length );
		_fnCalculateEnd( oSettings );
	}
	
	
	 /**
	 * Take an array of integers (index array) and remove a target integer (value - not 
	 * the key!)
	 *  @param {array} a Index array to target
	 *  @param {int} iTarget value to find
	 *  @memberof DataTable#oApi
	 */
	function _fnDeleteIndex( a, iTarget )
	{
		var iTargetIndex = -1;
		
		for ( var i=0, iLen=a.length ; i<iLen ; i++ )
		{
			if ( a[i] == iTarget )
			{
				iTargetIndex = i;
			}
			else if ( a[i] > iTarget )
			{
				a[i]--;
			}
		}
		
		if ( iTargetIndex != -1 )
		{
			a.splice( iTargetIndex, 1 );
		}
	}
	
	/**
	 * Create a new TR element (and it's TD children) for a row
	 *  @param {object} oSettings dataTables settings object
	 *  @param {int} iRow Row to consider
	 *  @param {node} [nTrIn] TR element to add to the table - optional. If not given,
	 *    DataTables will create a row automatically
	 *  @param {array} [anTds] Array of TD|TH elements for the row - must be given
	 *    if nTr is.
	 *  @memberof DataTable#oApi
	 */
	function _fnCreateTr ( oSettings, iRow, nTrIn, anTds )
	{
		var
			row = oSettings.aoData[iRow],
			rowData = row._aData,
			nTr, nTd, oCol,
			i, iLen;
	
		if ( row.nTr === null )
		{
			nTr = nTrIn || document.createElement('tr');
	
			/* Use a private property on the node to allow reserve mapping from the node
			 * to the aoData array for fast look up
			 */
			nTr._DT_RowIndex = iRow;
	
			/* Special parameters can be given by the data source to be used on the row */
			if ( rowData.DT_RowId )
			{
				nTr.id = rowData.DT_RowId;
			}
	
			if ( rowData.DT_RowClass )
			{
				nTr.className += ' '+rowData.DT_RowClass;
			}
	
			/* Process each column */
			for ( i=0, iLen=oSettings.aoColumns.length ; i<iLen ; i++ )
			{
				oCol = oSettings.aoColumns[i];
	
				nTd = nTrIn ? anTds[i] : document.createElement( oCol.sCellType );
	
				// Need to create the HTML if new, or if a rendering function is defined
				if ( !nTrIn || oCol.mRender || oCol.mData !== i )
				{
					nTd.innerHTML = _fnGetCellData( oSettings, iRow, i, 'display' );
				}
			
				/* Add user defined class */
				if ( oCol.sClass !== null )
				{
					nTd.className += ' '+oCol.sClass;
				}
	
				// Visibility - add or remove as required
				row._anHidden[i] = oCol.bVisible ? null : nTd;
				if ( oCol.bVisible && ! nTrIn )
				{
					nTr.appendChild( nTd );
				}
				else if ( ! oCol.bVisible && nTrIn )
				{
					nTd.parentNode.removeChild( nTd );
				}
	
				if ( oCol.fnCreatedCell )
				{
					oCol.fnCreatedCell.call( oSettings.oInstance,
						nTd, _fnGetCellData( oSettings, iRow, i, 'display' ), rowData, iRow, i
					);
				}
			}
	
			row.nTr = nTr;
	
			_fnCallbackFire( oSettings, 'aoRowCreatedCallback', null, [nTr, rowData, iRow] );
		}
	}
	
	
	/**
	 * Create the HTML header for the table
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnBuildHead( oSettings )
	{
		var i, nTh, iLen, j, jLen;
		var iThs = $('th, td', oSettings.nTHead).length;
		var iCorrector = 0;
		var jqChildren;
		
		/* If there is a header in place - then use it - otherwise it's going to get nuked... */
		if ( iThs !== 0 )
		{
			/* We've got a thead from the DOM, so remove hidden columns and apply width to vis cols */
			for ( i=0, iLen=oSettings.aoColumns.length ; i<iLen ; i++ )
			{
				nTh = oSettings.aoColumns[i].nTh;
				nTh.setAttribute('role', 'columnheader');
				if ( oSettings.aoColumns[i].bSortable )
				{
					nTh.setAttribute('tabindex', oSettings.iTabIndex);
					nTh.setAttribute('aria-controls', oSettings.sTableId);
				}
	
				if ( oSettings.aoColumns[i].sClass !== null )
				{
					$(nTh).addClass( oSettings.aoColumns[i].sClass );
				}
				
				/* Set the title of the column if it is user defined (not what was auto detected) */
				if ( oSettings.aoColumns[i].sTitle != nTh.innerHTML )
				{
					nTh.innerHTML = oSettings.aoColumns[i].sTitle;
				}
			}
		}
		else
		{
			/* We don't have a header in the DOM - so we are going to have to create one */
			var nTr = document.createElement( "tr" );
			
			for ( i=0, iLen=oSettings.aoColumns.length ; i<iLen ; i++ )
			{
				nTh = oSettings.aoColumns[i].nTh;
				nTh.innerHTML = oSettings.aoColumns[i].sTitle;
				nTh.setAttribute('tabindex', '0');
				
				if ( oSettings.aoColumns[i].sClass !== null )
				{
					$(nTh).addClass( oSettings.aoColumns[i].sClass );
				}
				
				nTr.appendChild( nTh );
			}
			$(oSettings.nTHead).html( '' )[0].appendChild( nTr );
			_fnDetectHeader( oSettings.aoHeader, oSettings.nTHead );
		}
		
		/* ARIA role for the rows */	
		$(oSettings.nTHead).children('tr').attr('role', 'row');
		
		/* Add the extra markup needed by jQuery UI's themes */
		if ( oSettings.bJUI )
		{
			for ( i=0, iLen=oSettings.aoColumns.length ; i<iLen ; i++ )
			{
				nTh = oSettings.aoColumns[i].nTh;
				
				var nDiv = document.createElement('div');
				nDiv.className = oSettings.oClasses.sSortJUIWrapper;
				$(nTh).contents().appendTo(nDiv);
				
				var nSpan = document.createElement('span');
				nSpan.className = oSettings.oClasses.sSortIcon;
				nDiv.appendChild( nSpan );
				nTh.appendChild( nDiv );
			}
		}
		
		if ( oSettings.oFeatures.bSort )
		{
			for ( i=0 ; i<oSettings.aoColumns.length ; i++ )
			{
				if ( oSettings.aoColumns[i].bSortable !== false )
				{
					_fnSortAttachListener( oSettings, oSettings.aoColumns[i].nTh, i );
				}
				else
				{
					$(oSettings.aoColumns[i].nTh).addClass( oSettings.oClasses.sSortableNone );
				}
			}
		}
		
		/* Deal with the footer - add classes if required */
		if ( oSettings.oClasses.sFooterTH !== "" )
		{
			$(oSettings.nTFoot).children('tr').children('th').addClass( oSettings.oClasses.sFooterTH );
		}
		
		/* Cache the footer elements */
		if ( oSettings.nTFoot !== null )
		{
			var anCells = _fnGetUniqueThs( oSettings, null, oSettings.aoFooter );
			for ( i=0, iLen=oSettings.aoColumns.length ; i<iLen ; i++ )
			{
				if ( anCells[i] )
				{
					oSettings.aoColumns[i].nTf = anCells[i];
					if ( oSettings.aoColumns[i].sClass )
					{
						$(anCells[i]).addClass( oSettings.aoColumns[i].sClass );
					}
				}
			}
		}
	}
	
	
	/**
	 * Draw the header (or footer) element based on the column visibility states. The
	 * methodology here is to use the layout array from _fnDetectHeader, modified for
	 * the instantaneous column visibility, to construct the new layout. The grid is
	 * traversed over cell at a time in a rows x columns grid fashion, although each 
	 * cell insert can cover multiple elements in the grid - which is tracks using the
	 * aApplied array. Cell inserts in the grid will only occur where there isn't
	 * already a cell in that position.
	 *  @param {object} oSettings dataTables settings object
	 *  @param array {objects} aoSource Layout array from _fnDetectHeader
	 *  @param {boolean} [bIncludeHidden=false] If true then include the hidden columns in the calc, 
	 *  @memberof DataTable#oApi
	 */
	function _fnDrawHead( oSettings, aoSource, bIncludeHidden )
	{
		var i, iLen, j, jLen, k, kLen, n, nLocalTr;
		var aoLocal = [];
		var aApplied = [];
		var iColumns = oSettings.aoColumns.length;
		var iRowspan, iColspan;
	
		if (  bIncludeHidden === undefined )
		{
			bIncludeHidden = false;
		}
	
		/* Make a copy of the master layout array, but without the visible columns in it */
		for ( i=0, iLen=aoSource.length ; i<iLen ; i++ )
		{
			aoLocal[i] = aoSource[i].slice();
			aoLocal[i].nTr = aoSource[i].nTr;
	
			/* Remove any columns which are currently hidden */
			for ( j=iColumns-1 ; j>=0 ; j-- )
			{
				if ( !oSettings.aoColumns[j].bVisible && !bIncludeHidden )
				{
					aoLocal[i].splice( j, 1 );
				}
			}
	
			/* Prep the applied array - it needs an element for each row */
			aApplied.push( [] );
		}
	
		for ( i=0, iLen=aoLocal.length ; i<iLen ; i++ )
		{
			nLocalTr = aoLocal[i].nTr;
			
			/* All cells are going to be replaced, so empty out the row */
			if ( nLocalTr )
			{
				while( (n = nLocalTr.firstChild) )
				{
					nLocalTr.removeChild( n );
				}
			}
	
			for ( j=0, jLen=aoLocal[i].length ; j<jLen ; j++ )
			{
				iRowspan = 1;
				iColspan = 1;
	
				/* Check to see if there is already a cell (row/colspan) covering our target
				 * insert point. If there is, then there is nothing to do.
				 */
				if ( aApplied[i][j] === undefined )
				{
					nLocalTr.appendChild( aoLocal[i][j].cell );
					aApplied[i][j] = 1;
	
					/* Expand the cell to cover as many rows as needed */
					while ( aoLocal[i+iRowspan] !== undefined &&
					        aoLocal[i][j].cell == aoLocal[i+iRowspan][j].cell )
					{
						aApplied[i+iRowspan][j] = 1;
						iRowspan++;
					}
	
					/* Expand the cell to cover as many columns as needed */
					while ( aoLocal[i][j+iColspan] !== undefined &&
					        aoLocal[i][j].cell == aoLocal[i][j+iColspan].cell )
					{
						/* Must update the applied array over the rows for the columns */
						for ( k=0 ; k<iRowspan ; k++ )
						{
							aApplied[i+k][j+iColspan] = 1;
						}
						iColspan++;
					}
	
					/* Do the actual expansion in the DOM */
					aoLocal[i][j].cell.rowSpan = iRowspan;
					aoLocal[i][j].cell.colSpan = iColspan;
				}
			}
		}
	}
	
	
	/**
	 * Insert the required TR nodes into the table for display
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnDraw( oSettings )
	{
		/* Provide a pre-callback function which can be used to cancel the draw is false is returned */
		var aPreDraw = _fnCallbackFire( oSettings, 'aoPreDrawCallback', 'preDraw', [oSettings] );
		if ( $.inArray( false, aPreDraw ) !== -1 )
		{
			_fnProcessingDisplay( oSettings, false );
			return;
		}
		
		var i, iLen, n;
		var anRows = [];
		var iRowCount = 0;
		var iStripes = oSettings.asStripeClasses.length;
		var iOpenRows = oSettings.aoOpenRows.length;
		
		oSettings.bDrawing = true;
		
		/* Check and see if we have an initial draw position from state saving */
		if ( oSettings.iInitDisplayStart !== undefined && oSettings.iInitDisplayStart != -1 )
		{
			if ( oSettings.oFeatures.bServerSide )
			{
				oSettings._iDisplayStart = oSettings.iInitDisplayStart;
			}
			else
			{
				oSettings._iDisplayStart = (oSettings.iInitDisplayStart >= oSettings.fnRecordsDisplay()) ?
					0 : oSettings.iInitDisplayStart;
			}
			oSettings.iInitDisplayStart = -1;
			_fnCalculateEnd( oSettings );
		}
		
		/* Server-side processing draw intercept */
		if ( oSettings.bDeferLoading )
		{
			oSettings.bDeferLoading = false;
			oSettings.iDraw++;
		}
		else if ( !oSettings.oFeatures.bServerSide )
		{
			oSettings.iDraw++;
		}
		else if ( !oSettings.bDestroying && !_fnAjaxUpdate( oSettings ) )
		{
			return;
		}
		
		if ( oSettings.aiDisplay.length !== 0 )
		{
			var iStart = oSettings._iDisplayStart;
			var iEnd = oSettings._iDisplayEnd;
			
			if ( oSettings.oFeatures.bServerSide )
			{
				iStart = 0;
				iEnd = oSettings.aoData.length;
			}
			
			for ( var j=iStart ; j<iEnd ; j++ )
			{
				var aoData = oSettings.aoData[ oSettings.aiDisplay[j] ];
				if ( aoData.nTr === null )
				{
					_fnCreateTr( oSettings, oSettings.aiDisplay[j] );
				}
	
				var nRow = aoData.nTr;
				
				/* Remove the old striping classes and then add the new one */
				if ( iStripes !== 0 )
				{
					var sStripe = oSettings.asStripeClasses[ iRowCount % iStripes ];
					if ( aoData._sRowStripe != sStripe )
					{
						$(nRow).removeClass( aoData._sRowStripe ).addClass( sStripe );
						aoData._sRowStripe = sStripe;
					}
				}
				
				/* Row callback functions - might want to manipulate the row */
				_fnCallbackFire( oSettings, 'aoRowCallback', null, 
					[nRow, oSettings.aoData[ oSettings.aiDisplay[j] ]._aData, iRowCount, j] );
				
				anRows.push( nRow );
				iRowCount++;
				
				/* If there is an open row - and it is attached to this parent - attach it on redraw */
				for ( var k=0 ; k<iOpenRows ; k++ )
				{
					if ( nRow == oSettings.aoOpenRows[k].nParent )
					{
						anRows.push( oSettings.aoOpenRows[k].nTr );
						break;
					}
				}
			}
		}
		else
		{
			/* Table is empty - create a row with an empty message in it */
			anRows[ 0 ] = document.createElement( 'tr' );
			
			if ( oSettings.asStripeClasses[0] )
			{
				anRows[ 0 ].className = oSettings.asStripeClasses[0];
			}
	
			var oLang = oSettings.oLanguage;
			var sZero = oLang.sZeroRecords;
			if ( oSettings.iDraw == 1 && oSettings.sAjaxSource !== null && !oSettings.oFeatures.bServerSide )
			{
				sZero = oLang.sLoadingRecords;
			}
			else if ( oLang.sEmptyTable && oSettings.fnRecordsTotal() === 0 )
			{
				sZero = oLang.sEmptyTable;
			}
	
			var nTd = document.createElement( 'td' );
			nTd.setAttribute( 'valign', "top" );
			nTd.colSpan = _fnVisbleColumns( oSettings );
			nTd.className = oSettings.oClasses.sRowEmpty;
			nTd.innerHTML = _fnInfoMacros( oSettings, sZero );
			
			anRows[ iRowCount ].appendChild( nTd );
		}
		
		/* Header and footer callbacks */
		_fnCallbackFire( oSettings, 'aoHeaderCallback', 'header', [ $(oSettings.nTHead).children('tr')[0], 
			_fnGetDataMaster( oSettings ), oSettings._iDisplayStart, oSettings.fnDisplayEnd(), oSettings.aiDisplay ] );
		
		_fnCallbackFire( oSettings, 'aoFooterCallback', 'footer', [ $(oSettings.nTFoot).children('tr')[0], 
			_fnGetDataMaster( oSettings ), oSettings._iDisplayStart, oSettings.fnDisplayEnd(), oSettings.aiDisplay ] );
		
		/* 
		 * Need to remove any old row from the display - note we can't just empty the tbody using
		 * $().html('') since this will unbind the jQuery event handlers (even although the node 
		 * still exists!) - equally we can't use innerHTML, since IE throws an exception.
		 */
		var
			nAddFrag = document.createDocumentFragment(),
			nRemoveFrag = document.createDocumentFragment(),
			nBodyPar;
		
		if ( oSettings.nTBody )
		{
			nBodyPar = oSettings.nTBody.parentNode;
			nRemoveFrag.appendChild( oSettings.nTBody );
			
			/* When doing infinite scrolling, only remove child rows when sorting, filtering or start
			 * up. When not infinite scroll, always do it.
			 */
			if ( !oSettings.oScroll.bInfinite || !oSettings._bInitComplete ||
			 	oSettings.bSorted || oSettings.bFiltered )
			{
				while( (n = oSettings.nTBody.firstChild) )
				{
					oSettings.nTBody.removeChild( n );
				}
			}
			
			/* Put the draw table into the dom */
			for ( i=0, iLen=anRows.length ; i<iLen ; i++ )
			{
				nAddFrag.appendChild( anRows[i] );
			}
			
			oSettings.nTBody.appendChild( nAddFrag );
			if ( nBodyPar !== null )
			{
				nBodyPar.appendChild( oSettings.nTBody );
			}
		}
		
		/* Call all required callback functions for the end of a draw */
		_fnCallbackFire( oSettings, 'aoDrawCallback', 'draw', [oSettings] );
		
		/* Draw is complete, sorting and filtering must be as well */
		oSettings.bSorted = false;
		oSettings.bFiltered = false;
		oSettings.bDrawing = false;
		
		if ( oSettings.oFeatures.bServerSide )
		{
			_fnProcessingDisplay( oSettings, false );
			if ( !oSettings._bInitComplete )
			{
				_fnInitComplete( oSettings );
			}
		}
	}
	
	
	/**
	 * Redraw the table - taking account of the various features which are enabled
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnReDraw( oSettings )
	{
		if ( oSettings.oFeatures.bSort )
		{
			/* Sorting will refilter and draw for us */
			_fnSort( oSettings, oSettings.oPreviousSearch );
		}
		else if ( oSettings.oFeatures.bFilter )
		{
			/* Filtering will redraw for us */
			_fnFilterComplete( oSettings, oSettings.oPreviousSearch );
		}
		else
		{
			_fnCalculateEnd( oSettings );
			_fnDraw( oSettings );
		}
	}
	
	
	/**
	 * Add the options to the page HTML for the table
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnAddOptionsHtml ( oSettings )
	{
		/*
		 * Create a temporary, empty, div which we can later on replace with what we have generated
		 * we do it this way to rendering the 'options' html offline - speed :-)
		 */
		var nHolding = $('<div></div>')[0];
		oSettings.nTable.parentNode.insertBefore( nHolding, oSettings.nTable );
		
		/* 
		 * All DataTables are wrapped in a div
		 */
		oSettings.nTableWrapper = $('<div id="'+oSettings.sTableId+'_wrapper" class="'+oSettings.oClasses.sWrapper+'" role="grid"></div>')[0];
		oSettings.nTableReinsertBefore = oSettings.nTable.nextSibling;
	
		/* Track where we want to insert the option */
		var nInsertNode = oSettings.nTableWrapper;
		
		/* Loop over the user set positioning and place the elements as needed */
		var aDom = oSettings.sDom.split('');
		var nTmp, iPushFeature, cOption, nNewNode, cNext, sAttr, j;
		for ( var i=0 ; i<aDom.length ; i++ )
		{
			iPushFeature = 0;
			cOption = aDom[i];
			
			if ( cOption == '<' )
			{
				/* New container div */
				nNewNode = $('<div></div>')[0];
				
				/* Check to see if we should append an id and/or a class name to the container */
				cNext = aDom[i+1];
				if ( cNext == "'" || cNext == '"' )
				{
					sAttr = "";
					j = 2;
					while ( aDom[i+j] != cNext )
					{
						sAttr += aDom[i+j];
						j++;
					}
					
					/* Replace jQuery UI constants */
					if ( sAttr == "H" )
					{
						sAttr = oSettings.oClasses.sJUIHeader;
					}
					else if ( sAttr == "F" )
					{
						sAttr = oSettings.oClasses.sJUIFooter;
					}
					
					/* The attribute can be in the format of "#id.class", "#id" or "class" This logic
					 * breaks the string into parts and applies them as needed
					 */
					if ( sAttr.indexOf('.') != -1 )
					{
						var aSplit = sAttr.split('.');
						nNewNode.id = aSplit[0].substr(1, aSplit[0].length-1);
						nNewNode.className = aSplit[1];
					}
					else if ( sAttr.charAt(0) == "#" )
					{
						nNewNode.id = sAttr.substr(1, sAttr.length-1);
					}
					else
					{
						nNewNode.className = sAttr;
					}
					
					i += j; /* Move along the position array */
				}
				
				nInsertNode.appendChild( nNewNode );
				nInsertNode = nNewNode;
			}
			else if ( cOption == '>' )
			{
				/* End container div */
				nInsertNode = nInsertNode.parentNode;
			}
			else if ( cOption == 'l' && oSettings.oFeatures.bPaginate && oSettings.oFeatures.bLengthChange )
			{
				/* Length */
				nTmp = _fnFeatureHtmlLength( oSettings );
				iPushFeature = 1;
			}
			else if ( cOption == 'f' && oSettings.oFeatures.bFilter )
			{
				/* Filter */
				nTmp = _fnFeatureHtmlFilter( oSettings );
				iPushFeature = 1;
			}
			else if ( cOption == 'r' && oSettings.oFeatures.bProcessing )
			{
				/* pRocessing */
				nTmp = _fnFeatureHtmlProcessing( oSettings );
				iPushFeature = 1;
			}
			else if ( cOption == 't' )
			{
				/* Table */
				nTmp = _fnFeatureHtmlTable( oSettings );
				iPushFeature = 1;
			}
			else if ( cOption ==  'i' && oSettings.oFeatures.bInfo )
			{
				/* Info */
				nTmp = _fnFeatureHtmlInfo( oSettings );
				iPushFeature = 1;
			}
			else if ( cOption == 'p' && oSettings.oFeatures.bPaginate )
			{
				/* Pagination */
				nTmp = _fnFeatureHtmlPaginate( oSettings );
				iPushFeature = 1;
			}
			else if ( DataTable.ext.aoFeatures.length !== 0 )
			{
				/* Plug-in features */
				var aoFeatures = DataTable.ext.aoFeatures;
				for ( var k=0, kLen=aoFeatures.length ; k<kLen ; k++ )
				{
					if ( cOption == aoFeatures[k].cFeature )
					{
						nTmp = aoFeatures[k].fnInit( oSettings );
						if ( nTmp )
						{
							iPushFeature = 1;
						}
						break;
					}
				}
			}
			
			/* Add to the 2D features array */
			if ( iPushFeature == 1 && nTmp !== null )
			{
				if ( typeof oSettings.aanFeatures[cOption] !== 'object' )
				{
					oSettings.aanFeatures[cOption] = [];
				}
				oSettings.aanFeatures[cOption].push( nTmp );
				nInsertNode.appendChild( nTmp );
			}
		}
		
		/* Built our DOM structure - replace the holding div with what we want */
		nHolding.parentNode.replaceChild( oSettings.nTableWrapper, nHolding );
	}
	
	
	/**
	 * Use the DOM source to create up an array of header cells. The idea here is to
	 * create a layout grid (array) of rows x columns, which contains a reference
	 * to the cell that that point in the grid (regardless of col/rowspan), such that
	 * any column / row could be removed and the new grid constructed
	 *  @param array {object} aLayout Array to store the calculated layout in
	 *  @param {node} nThead The header/footer element for the table
	 *  @memberof DataTable#oApi
	 */
	function _fnDetectHeader ( aLayout, nThead )
	{
		var nTrs = $(nThead).children('tr');
		var nTr, nCell;
		var i, k, l, iLen, jLen, iColShifted, iColumn, iColspan, iRowspan;
		var bUnique;
		var fnShiftCol = function ( a, i, j ) {
			var k = a[i];
	                while ( k[j] ) {
				j++;
			}
			return j;
		};
	
		aLayout.splice( 0, aLayout.length );
		
		/* We know how many rows there are in the layout - so prep it */
		for ( i=0, iLen=nTrs.length ; i<iLen ; i++ )
		{
			aLayout.push( [] );
		}
		
		/* Calculate a layout array */
		for ( i=0, iLen=nTrs.length ; i<iLen ; i++ )
		{
			nTr = nTrs[i];
			iColumn = 0;
			
			/* For every cell in the row... */
			nCell = nTr.firstChild;
			while ( nCell ) {
				if ( nCell.nodeName.toUpperCase() == "TD" ||
				     nCell.nodeName.toUpperCase() == "TH" )
				{
					/* Get the col and rowspan attributes from the DOM and sanitise them */
					iColspan = nCell.getAttribute('colspan') * 1;
					iRowspan = nCell.getAttribute('rowspan') * 1;
					iColspan = (!iColspan || iColspan===0 || iColspan===1) ? 1 : iColspan;
					iRowspan = (!iRowspan || iRowspan===0 || iRowspan===1) ? 1 : iRowspan;
	
					/* There might be colspan cells already in this row, so shift our target 
					 * accordingly
					 */
					iColShifted = fnShiftCol( aLayout, i, iColumn );
					
					/* Cache calculation for unique columns */
					bUnique = iColspan === 1 ? true : false;
					
					/* If there is col / rowspan, copy the information into the layout grid */
					for ( l=0 ; l<iColspan ; l++ )
					{
						for ( k=0 ; k<iRowspan ; k++ )
						{
							aLayout[i+k][iColShifted+l] = {
								"cell": nCell,
								"unique": bUnique
							};
							aLayout[i+k].nTr = nTr;
						}
					}
				}
				nCell = nCell.nextSibling;
			}
		}
	}
	
	
	/**
	 * Get an array of unique th elements, one for each column
	 *  @param {object} oSettings dataTables settings object
	 *  @param {node} nHeader automatically detect the layout from this node - optional
	 *  @param {array} aLayout thead/tfoot layout from _fnDetectHeader - optional
	 *  @returns array {node} aReturn list of unique th's
	 *  @memberof DataTable#oApi
	 */
	function _fnGetUniqueThs ( oSettings, nHeader, aLayout )
	{
		var aReturn = [];
		if ( !aLayout )
		{
			aLayout = oSettings.aoHeader;
			if ( nHeader )
			{
				aLayout = [];
				_fnDetectHeader( aLayout, nHeader );
			}
		}
	
		for ( var i=0, iLen=aLayout.length ; i<iLen ; i++ )
		{
			for ( var j=0, jLen=aLayout[i].length ; j<jLen ; j++ )
			{
				if ( aLayout[i][j].unique && 
					 (!aReturn[j] || !oSettings.bSortCellsTop) )
				{
					aReturn[j] = aLayout[i][j].cell;
				}
			}
		}
		
		return aReturn;
	}
	
	
	
	/**
	 * Create an Ajax call based on the table's settings, taking into account that
	 * parameters can have multiple forms, and backwards compatibility.
	 *
	 * @param {object} oSettings dataTables settings object
	 * @param {array} data Data to send to the server, required by
	 *     DataTables - may be augmented by developer callbacks
	 * @param {function} fn Callback function to run when data is obtained
	 */
	function _fnBuildAjax( oSettings, data, fn )
	{
		// Compatibility with 1.9-, allow fnServerData and event to manipulate
		_fnCallbackFire( oSettings, 'aoServerParams', 'serverParams', [data] );
	
		var ajaxData;
	
		if ( $.isPlainObject( oSettings.ajax ) && oSettings.ajax.data )
		{
			ajaxData = oSettings.ajax.data;
			var newData = $.isFunction( ajaxData ) ?
				ajaxData( data ) :  // fn can manipulate data or return an object or array
				ajaxData;           // object or array to merge
	
			if ( $.isArray( newData ) )
			{
				// name value pair objects in an array
				data = data.concat( newData );
			}
			else if ( $.isPlainObject( newData ) )
			{
				// aData is an array of name value pairs at this point - convert to
				// an object to easily merge data - jQuery will cope with the switch
				var oData = {};
				$.each( data, function (key, val) {
					oData[val.name] = val.value;
				} );
	
				data = $.extend( true, oData, newData );
			}
	
			// Remove the data property as we've resolved it already
			delete oSettings.ajax.data;
		}
	
		var baseAjax = {
			"data": data,
			"success": function (json) {
				if ( json.sError ) {
					oSettings.oApi._fnLog( oSettings, 0, json.sError );
				}
				
				$(oSettings.oInstance).trigger('xhr', [oSettings, json]);
				fn( json );
			},
			"dataType": "json",
			"cache": false,
			"type": oSettings.sServerMethod,
			"error": function (xhr, error, thrown) {
				if ( error == "parsererror" ) {
					oSettings.oApi._fnLog( oSettings, 0, "DataTables: invalid JSON response" );
				}
			}
		};
	
		if ( oSettings.fnServerData )
		{
			// DataTables 1.9- compatibility
			oSettings.fnServerData.call( oSettings.oInstance,
				oSettings.sAjaxSource, data, fn, oSettings
			);
		}
		else if ( oSettings.sAjaxSource || typeof oSettings.ajax === 'string' )
		{
			// DataTables 1.9- compatibility
			oSettings.jqXHR = $.ajax( $.extend( baseAjax, {
				url: oSettings.ajax || oSettings.sAjaxSource
			} ) );
		}
		else if ( $.isFunction( oSettings.ajax ) )
		{
			// Is a function - let the caller define what needs to be done
			oSettings.jqXHR = oSettings.ajax.call( oSettings.oInstance,
				data, fn, oSettings
			);
		}
		else
		{
			// Object to extend the base settings
			oSettings.jqXHR = $.ajax( $.extend( baseAjax, oSettings.ajax ) );
	
			// Restore for next time around
			oSettings.ajax.data = ajaxData;
		}
	}
	
	
	/**
	 * Update the table using an Ajax call
	 *  @param {object} oSettings dataTables settings object
	 *  @returns {boolean} Block the table drawing or not
	 *  @memberof DataTable#oApi
	 */
	function _fnAjaxUpdate( oSettings )
	{
		if ( oSettings.bAjaxDataGet )
		{
			oSettings.iDraw++;
			_fnProcessingDisplay( oSettings, true );
			var iColumns = oSettings.aoColumns.length;
			var aoData = _fnAjaxParameters( oSettings );
	
			_fnBuildAjax( oSettings, aoData, function(json) {
				_fnAjaxUpdateDraw( oSettings, json );
			}, oSettings );
	
			return false;
		}
		return true;
	}
	
	
	/**
	 * Build up the parameters in an object needed for a server-side processing request
	 *  @param {object} oSettings dataTables settings object
	 *  @returns {bool} block the table drawing or not
	 *  @memberof DataTable#oApi
	 */
	function _fnAjaxParameters( oSettings )
	{
		var aoColumns = oSettings.aoColumns;
		var iColumns = aoColumns.length;
		var aoData = [], mDataProp, aaSort, aDataSort;
		var i, j;
		var param = function ( name, value ) {
			aoData.push( { 'name': name, 'value': value } );
		};
		
		param( 'sEcho',          oSettings.iDraw );
		param( 'iColumns',       iColumns );
		param( 'sColumns',       _fnColumnOrdering(oSettings) );
		param( 'iDisplayStart',  oSettings._iDisplayStart );
		param( 'iDisplayLength', oSettings.oFeatures.bPaginate !== false ?
			oSettings._iDisplayLength : -1
		);
			
		for ( i=0 ; i<iColumns ; i++ )
		{
			mDataProp = aoColumns[i].mData;
			param( "mDataProp_"+i, typeof(mDataProp)==="function" ? 'function' : mDataProp );
		}
		
		/* Filtering */
		if ( oSettings.oFeatures.bFilter !== false )
		{
			param( 'sSearch', oSettings.oPreviousSearch.sSearch );
			param( 'bRegex', oSettings.oPreviousSearch.bRegex );
			for ( i=0 ; i<iColumns ; i++ )
			{
				param( 'sSearch_'+i,     oSettings.aoPreSearchCols[i].sSearch );
				param( 'bRegex_'+i,      oSettings.aoPreSearchCols[i].bRegex );
				param( 'bSearchable_'+i, aoColumns[i].bSearchable );
			}
		}
		
		/* Sorting */
		if ( oSettings.oFeatures.bSort !== false )
		{
			var iCounter = 0;
	
			aaSort = ( oSettings.aaSortingFixed !== null ) ?
				oSettings.aaSortingFixed.concat( oSettings.aaSorting ) :
				oSettings.aaSorting.slice();
			
			for ( i=0 ; i<aaSort.length ; i++ )
			{
				aDataSort = aoColumns[ aaSort[i][0] ].aDataSort;
				
				for ( j=0 ; j<aDataSort.length ; j++ )
				{
					param( 'iSortCol_'+iCounter, aDataSort[j] );
					param( 'sSortDir_'+iCounter, aaSort[i][1] );
					iCounter++;
				}
			}
			param( 'iSortingCols', iCounter );
			
			for ( i=0 ; i<iColumns ; i++ )
			{
				param( 'bSortable_'+i, aoColumns[i].bSortable );
			}
		}
		
		return aoData;
	}
	
	
	/**
	 * Data the data from the server (nuking the old) and redraw the table
	 *  @param {object} oSettings dataTables settings object
	 *  @param {object} json json data return from the server.
	 *  @param {string} json.sEcho Tracking flag for DataTables to match requests
	 *  @param {int} json.iTotalRecords Number of records in the data set, not accounting for filtering
	 *  @param {int} json.iTotalDisplayRecords Number of records in the data set, accounting for filtering
	 *  @param {array} json.aaData The data to display on this page
	 *  @param {string} [json.sColumns] Column ordering (sName, comma separated)
	 *  @memberof DataTable#oApi
	 */
	function _fnAjaxUpdateDraw ( oSettings, json )
	{
		if ( json.sEcho !== undefined )
		{
			/* Protect against old returns over-writing a new one. Possible when you get
			 * very fast interaction, and later queries are completed much faster
			 */
			if ( json.sEcho*1 < oSettings.iDraw )
			{
				return;
			}
			oSettings.iDraw = json.sEcho * 1;
		}
		
		if ( !oSettings.oScroll.bInfinite || oSettings.bSorted || oSettings.bFiltered )
		{
			_fnClearTable( oSettings );
		}
		oSettings._iRecordsTotal = parseInt(json.iTotalRecords, 10);
		oSettings._iRecordsDisplay = parseInt(json.iTotalDisplayRecords, 10);
		
		var aData = _fnAjaxDataSrc( oSettings, json );
		for ( var i=0, iLen=aData.length ; i<iLen ; i++ )
		{
			_fnAddData( oSettings, aData[i] );
		}
		oSettings.aiDisplay = oSettings.aiDisplayMaster.slice();
		
		oSettings.bAjaxDataGet = false;
		_fnDraw( oSettings );
		oSettings.bAjaxDataGet = true;
		_fnProcessingDisplay( oSettings, false );
	}
	
	
	/**
	 * Get the data from the JSON data source to use for drawing a table. Using
	 * `_fnGetObjectDataFn` allows the data to be sourced from a property of the
	 * source object, or from a processing function.
	 *  @param {object} oSettings dataTables settings object
	 *  @param  {object} json Data source object / array from the server
	 *  @return {array} Array of data to use
	 */
	function _fnAjaxDataSrc ( oSettings, json )
	{
		var dataSrc = $.isPlainObject( oSettings.ajax ) && oSettings.ajax.dataSrc !== undefined ?
			oSettings.ajax.dataSrc :
			oSettings.sAjaxDataProp; // Compatibility with 1.9-.
	
		return dataSrc !== "" ?
			_fnGetObjectDataFn( dataSrc )(json) :
			json;
	}
	
	
	/**
	 * Generate the node required for filtering text
	 *  @returns {node} Filter control element
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnFeatureHtmlFilter ( oSettings )
	{
		var oPreviousSearch = oSettings.oPreviousSearch;
		
		var sSearchStr = oSettings.oLanguage.sSearch;
		sSearchStr = (sSearchStr.indexOf('_INPUT_') !== -1) ?
		  sSearchStr.replace('_INPUT_', '<input type="text" />') :
		  sSearchStr==="" ? '<input type="text" />' : sSearchStr+' <input type="text" />';
		
		var nFilter = document.createElement( 'div' );
		nFilter.className = oSettings.oClasses.sFilter;
		nFilter.innerHTML = '<label>'+sSearchStr+'</label>';
		if ( !oSettings.aanFeatures.f )
		{
			nFilter.id = oSettings.sTableId+'_filter';
		}
		
		var jqFilter = $('input[type="text"]', nFilter);
	
		// Store a reference to the input element, so other input elements could be
		// added to the filter wrapper if needed (submit button for example)
		nFilter._DT_Input = jqFilter[0];
	
		jqFilter.val( oPreviousSearch.sSearch.replace('"','&quot;') );
		jqFilter.bind( 'keyup.DT', function(e) {
			/* Update all other filter input elements for the new display */
			var n = oSe