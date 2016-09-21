$(document).ready(function(){

	//*******************************************
	/*	EASY PIE CHART
	/********************************************/
	var user_name='masterpassuser';
	var social_user_name='social';
	var user=user_name;
	var duration='monthly';
	initCharts();
	function initCharts()
	{
		populateCategoryPieChart(user_name);
		populateMerchantPieChart(user_name);
	}

	if( $('.easy-pie-chart').length > 0 ) {

		var cOptions = {
			animate: 3000,
			trackColor: "#dadada",
			scaleColor: "#dadada",
			lineCap: "square",
			lineWidth: 5,
			barColor: "#ef1e25",
			onStep: function(from, to, percent) {
				$(this.el).find('.percent').text(Math.round(percent));
			}
		}

		cOptions.barColor = "#3E9C1A"; // green
		$('.easy-pie-chart.green').easyPieChart(cOptions);
		cOptions.barColor = "#FFB800"; // yellow
		$('.easy-pie-chart.yellow').easyPieChart(cOptions);
		cOptions.barColor = "#E60404"; // red
		$('.easy-pie-chart.red').easyPieChart(cOptions);
	}


	//*******************************************
	/*	FLOT CHART
	/********************************************/

	if( $('.sales-chart').length > 0 ) {
		$placeholder = $('.sales-chart');
		$placeholder.attr('data-ctype', '#month');
		chartMonth($placeholder,duration);

		// tabbed chart
		$('#sales-stat-tab a').click(function(e) {
			e.preventDefault();
		
			$chartType = $(this).attr('href');

			// remove active state
			$('#sales-stat-tab li').removeClass('active');
			$(this).parents('li').addClass('active');
			
			if($chartType == '#month') {
				chartMonth($placeholder,duration);
			}else if($chartType == '#quarter') {
				chartQuarter($placeholder);
			}else if($chartType == '#half') {
				chartHalfYear($placeholder);
			}else if($chartType == '#year') {
				chartYear($placeholder);
			}

			$placeholder.attr('data-ctype', $chartType);
		});

		var previousPoint = null;
	}

	function getRandomValues() {
		// data setup
		var values = new Array(20);

		for (var i = 0; i < values.length; i++){
			values[i] = [5 + randomVal(), 10 + randomVal(), 15 + randomVal(), 20 + randomVal(), 30 + randomVal(),
				35 + randomVal(), 40 + randomVal(), 45 + randomVal(), 50 + randomVal()]
		}

		return values;
	}


	//*******************************************
	/*	INLINE SPARKLINE WIDGET
	/********************************************/

	if( $('.sparkline-stat-item .inlinesparkline').length > 0 ) {
		var values1 = getRandomValues();
		var sparklineWidget = function() {

			var params = {
				width: '' + $('.sparkline-stat-item').width() + '',
				height: '30px',
				lineWidth: '2',
				lineColor: '#7d939a',
				fillColor: 'rgba(124,157,154, 0.1)',
				spotRadius: '2',
				highlightLineColor: '#aedaff',
				highlightSpotColor: '#71aadb',
				spotColor: false,
				minSpotColor: false,
				maxSpotColor: false,
				disableInteraction: false
			}

			$('#sparkline1').sparkline(values1[0], params);
			$('#sparkline2').sparkline(values1[1], params);
			$('#sparkline3').sparkline(values1[2], params);
			$('#sparkline4').sparkline(values1[3], params);
			$('#sparkline5').sparkline(values1[4], params);
			$('#sparkline6').sparkline(values1[5], params);
		}

		sparklineWidget();

	}

	//*******************************************
	/*	SECONDARY STAT ITEM SPARKLINE
	/********************************************/

	if( $('.secondary-stat-item .inlinesparkline').length > 0 ) {
		var values2 = getRandomValues();
		var sparklineStat = function() {

			var params = {
				width:'' + $('.secondary-stat-item').innerWidth() + '',
				height: '60px',

				spotRadius: '2',
				spotColor: false,
				minSpotColor: false,
				maxSpotColor: false,

				lineWidth: 1,
				lineColor: "rgba(87,90,103, 0.5)",
				fillColor: "rgba(87,90,103, 0.1)",
				highlightLineColor: '#fff',
				highlightSpotColor: '#fff',
				disableInteraction: true
			}

			$('.secondary-stat-item #spark-stat1').sparkline(values2[0], params);
			$('.secondary-stat-item #spark-stat2').sparkline(values2[1], params);
			$('.secondary-stat-item #spark-stat3').sparkline(values2[2], params);

		}
		
		sparklineStat();
	}


	//*******************************************
	/*	NUMBER-CHART SPARKLINE (Dashboard v2)
	/********************************************/

	if( $('.number-chart .inlinesparkline').length > 0 ) {

		var randomVal = getRandomValues();
		var sparklineNumberChart = function() {

			var params = {
				width: '140px',
				height: '30px',
				lineWidth: '2',
				lineColor: '#7d939a',
				fillColor: false,
				spotRadius: '2',
				highlightLineColor: '#aedaff',
				highlightSpotColor: '#71aadb',
				spotColor: false,
				minSpotColor: false,
				maxSpotColor: false,
				disableInteraction: false
			}

			$('#number-chart1').sparkline(randomVal[0], params);
			$('#number-chart2').sparkline(randomVal[1], params);
			$('#number-chart3').sparkline(randomVal[2], params);
			$('#number-chart4').sparkline(randomVal[3], params);
		}

		sparklineNumberChart();
	}

	/* sparkline on window resize */
	var sparkResize;

	$(window).resize(function(e) {
		clearTimeout(sparkResize);

		if( $('.sparkline-stat-item .inlinesparkline').length > 0 ) {
			sparkResize = setTimeout(sparklineStat, 200);
		}

		if( $('.secondary-stat-item .inlinesparkline').length > 0 ) {
			sparkResize = setTimeout(sparklineWidget, 200);
		}
	});


	//*************************************************
	/*	REAL TIME PIE CHART, CPU USAGE (Dashboard v3)
	/**************************************************/

	if( $('#cpu-usage').length > 0 ) {
			var cpuUsage = $('#cpu-usage').easyPieChart({
				size: 130,
				barColor: function(percent) {
					return "rgb(" + Math.round(200 * percent / 100) + ", " + Math.round(200 * (1.1 - percent / 100)) + ", 0)";
				},
				trackColor: 'rgba(73, 73, 73, 0.2)',
				scaleColor: false,
				lineWidth: 5,
				lineCap: "square",
				animate: 800
			});

			var updateInterval = 3000; // in milliseconds

			setInterval( function() {
				var randomVal;
				randomVal = getRandomInt(0, 100);

				cpuUsage.data('easyPieChart').update(randomVal);
				cpuUsage.find('.percent').text(randomVal);
			}, updateInterval);

			function getRandomInt(min, max) {
				return Math.floor(Math.random() * (max - min + 1)) + min;
			}
	}


	//*******************************************
	/*	MINI PIE CHART
	/********************************************/

	if( $('.mini-pie-chart').length > 0 ) {
		var visitData = [[30, 15, 55], [65, 25, 10], [55, 15, 30], [25, 25, 50], [40, 35, 25], [70, 15, 15], [15, 25, 60]];
		var params = {
			type: "pie",
			sliceColors: ["#7d939a", "#5399D6", "#d7ea2b"],
		}

		$('#mini-pie-chart1').sparkline(visitData[0], params);
		$('#mini-pie-chart2').sparkline(visitData[1], params);
		$('#mini-pie-chart3').sparkline(visitData[2], params);
		$('#mini-pie-chart4').sparkline(visitData[3], params);
		$('#mini-pie-chart5').sparkline(visitData[4], params);
		$('#mini-pie-chart6').sparkline(visitData[5], params);
		$('#mini-pie-chart7').sparkline(visitData[6], params);
	}


	//*******************************************
	/*	MINI BAR CHART
	/********************************************/

	if( $('.mini-bar-chart').length > 0 ) {
		var values = getRandomValues();
		var params = {
			type: 'bar',
			barWidth: 5,
			height: 25
		}

		params.barColor = '#CE7B11';
		$('#mini-bar-chart1').sparkline(values[0], params);
		params.barColor = '#1D92AF';
		$('#mini-bar-chart2').sparkline(values[1], params);
		params.barColor = '#3F7577';
		$('#mini-bar-chart3').sparkline(values[2], params);
	}


	//*******************************************
	/*	CHART AND STAT DEMO PAGE
	/********************************************/

	if( $('#demo-line-chart').length > 0 ) 
		chartYear( $('#demo-line-chart') );
	if( $('#demo-area-chart').length > 0 )
		chartWeek( $('#demo-area-chart') );
	if( $('#demo-vertical-bar-chart').length > 0 )
		chartBarVertical( $('#demo-vertical-bar-chart') );
	if( $('#demo-horizontal-bar-chart').length > 0 )
		chartBarHorizontal( $('#demo-horizontal-bar-chart') );
	if( $('#demo-multi-types-chart').length > 0 )
		chartMonth( $('#demo-multi-types-chart') );

	/* interactive chart demo page */
	if( $('#demo-toggle-series-chart').length > 0 ) {
		chartToggleSeries( $('#demo-toggle-series-chart') );
	}

	if( $('#demo-select-zoom-chart').length > 0 ) {
		chartSelectZoomSeries( $('#demo-select-zoom-chart') );
	}

	/* real-time chart demo */
	if ( $('#demo-real-time-chart').length > 0  ) {
		chartRealtTime($('#demo-real-time-chart'), "bar");
	}

	/* javascript helper functions */
	function showTooltip(x, y, contents) {

		$("<div id='tooltip' class='flot-tooltip'>" + contents + "</div>").css({
			top: y + 5,
			left: x + 5,
		}).appendTo("body").fadeIn(200);
	}

	// get day function
	function gt(y, m, d) {
		return new Date(y, m-1, d).getTime();
	}

	function donutLabelFormatter(label, series) {
		return "<div class=\"donut-label\">" + label + "<br/>" + Math.round(series.percent) + "%</div>";
	}

	function randomVal(){
		return Math.floor( Math.random() * 80 );
	}

	// init flot chart: current week
	function chartWeek(placeholder) {

		var visit = [
			[gt(2016, 9, 21), 188], [gt(2016, 9, 22), 185], [gt(2016, 9, 23), 250], [gt(2016, 9, 24), 230], [gt(2016, 9, 25), 275], [gt(2016, 9, 26), 190], [gt(2016, 9, 27), 230]
		];

		var val = [
			[gt(2016, 9, 21), 100], [gt(2016, 9, 22),50], [gt(2016, 9, 23),95], [gt(2016, 9, 24),105], [gt(2016, 9, 25),125], [gt(2016, 9, 26),90], [gt(2016, 9, 27),155]
		];

		var plot = $.plot(placeholder, 
			[
				{
					data: visit,
					label: "Visits",
					lines: {
						show: true,
						lineWidth: 2,
						fill: true,
					},
					points: {
						show: true, 
						lineWidth: 3,
						fill: true,
						fillColor: "#fafafa"
					}
				},
				{
					data: val,
					label: "Sales",
					lines: {
						show: true,
						fill: true
					},
					points: {
						show: true, 
						fill: true,
						fillColor: "#fafafa"
					},
				}
			], 

			{
			series: {
				lines: {
					lineWidth: 2,
					fillColor: { colors: [ { opacity: 0.1 }, { opacity: 0.1 } ] }
				},
				points: {
					lineWidth: 3,
				},

				shadowSize: 0
			},
			grid: {
				hoverable: true, 
				clickable: true,
				borderWidth: 0,
				tickColor: "#E4E4E4"
			},
			colors: ["#7d939a", "#1D92AF"],
			yaxis: {
				font: { color: "#555" },
				ticks: 8
			},
			xaxis: {
				mode: "time",
				timezone: "browser",
				minTickSize: [1, "day"],
				timeformat: "%a",
				font: { color: "#555" },
				tickColor: "#fafafa",
				autoscaleMargin: 0.02
			},
			legend: {
				labelBoxBorderColor: "transparent",
				backgroundColor: "transparent"
			},
			tooltip: true,
			tooltipOpts: {
				content: '%s: %y'
			}

		});
	}

	// init flot chart: current month
	function chartMonth(placeholder,duration) {

		var val=[];
		var yours=[];
		if(duration == 'daily')
		{
				yours =[
				[gt(2016, 9, 1), 6.5], [gt(2016, 9, 2), 239.56], [gt(2016, 9, 5), 83.54], [gt(2016, 9, 6), 33.6],[gt(2016, 9, 8), 207.49], [gt(2016, 9, 9),94.5]
			];
				val =[
				[gt(2016, 9, 1), 100.70], [gt(2016, 9, 2), 274.72], [gt(2016, 9, 3), 50.60], [gt(2016, 9, 4), 55.80], [gt(2016, 9, 5), 49.19], [gt(2016, 9, 6), 53.84]
			];
		}else
		{
				yours =[
					[gt(2016, 9, 1), 6.5], [gt(2016, 9, 2), 239.56], [gt(2016, 9, 5), 83.54], [gt(2016, 9, 6), 33.6],
					[gt(2016, 9, 8), 207.49], [gt(2016, 9, 9),94.5], [gt(2016, 9, 10), 63.7], [gt(2016, 9, 11), 155], [gt(2016, 9, 12), 69.8], [gt(2016, 9, 13), 128.34],
					[gt(2016, 9, 15), 32.61], [gt(2016, 9, 18), 399.82], [gt(2016, 9, 19), 16.58], [gt(2016, 9, 20), 245.54], [gt(2016, 9, 21), 38.53],
					[gt(2016, 9, 22), 229.6]
					];
		
				val =[
					[gt(2016, 9, 1), 100.70], [gt(2016, 9, 2), 274.72], [gt(2016, 9, 3), 50.60], [gt(2016, 9, 4), 55.80], [gt(2016, 9, 5), 49.19], [gt(2016, 9, 6), 53.84], [gt(2016, 9, 7), 524.39],
					[gt(2016, 9, 8), 301.83], [gt(2016, 9, 9), 457.39], [gt(2016, 9, 10), 65.17], [gt(2016, 9, 11), 315.05], [gt(2016, 9, 12), 276.20], [gt(2016, 9, 13), 56.24], [gt(2016, 9, 14), 47.35],
					[gt(2016, 9, 15), 185.70], [gt(2016, 9, 16), 98.95], [gt(2016, 9, 17), 159.91], [gt(2016, 9, 18), 76.77], [gt(2016, 9, 19), 236.94], [gt(2016, 9, 20), 41.26], [gt(2016, 9, 21), 45.38],
					[gt(2016, 9, 22), 100.29]
				];
		}


		var plot = $.plot(placeholder, 
			[
				{
					data: yours,
					label: "Yours",
					bars: {
						show: true,
						fill: false,
						barWidth: 0.1,
						align: "center",
						lineWidth: 18,
						data: 'bar'
						
					},
				},
				{
					data: val,
					label: "Social"
				}
			], 

			{
				series: {
					lines: {
						show: true,
						lineWidth: 2, 
						fill: false
					},
					points: {
						show: true, 
						lineWidth: 3,
						fill: true,
						fillColor: "#fafafa"
					},
					shadowSize: 0
				},
				grid: {
					hoverable: true, 
					clickable: true,
					borderWidth: 0,
					tickColor: "#E4E4E4",
					
				},
				colors: ["#d9d9d9", "#5399D6"],
				yaxis: {
					font: { color: "#555" },
					ticks: 8,
				},
				xaxis: {
					mode: "time",
					timezone: "browser",
					minTickSize: [1, "day"],
					font: { color: "#555" },
					tickColor: "#fafafa",
					autoscaleMargin: 0.02
				},
				legend: {
					labelBoxBorderColor: "transparent",
					backgroundColor: "transparent"
				},
				tooltip: true,
				tooltipOpts: {
					content: '%s: %y'
				}
			}
		); 
		placeholder.bind("plotclick", function(event, pos, obj) {
			if(obj!=null)
			{
				if(obj.series.label=='Social')
				{
					user=social_user_name;
					populateCategoryPieChart(user);
					populateMerchantPieChart(user);
				}else{
					user=user_name;
					populateCategoryPieChart(user);
					populateMerchantPieChart(user);
				}
			}
			else
			{
				chartMonth(placeholder,'daily');
			}
		});
	}

	// init flot chart: current quarter
	function chartQuarter(placeholder) {
		chartMonth(placeholder,duration);
	}
	
	// init flot chart: current 6 months
	function chartHalfYear(placeholder) {
		chartMonth(placeholder,duration);
	}
	
	// init flot chart: current year
	function chartYear(placeholder) {
		chartMonth(placeholder,duration);
	}

	// init flot chart: vertical bar chart
	function chartBarVertical(placeholder) {
		var basic = [
			[gt(2016, 9, 21), 188], [gt(2016, 9, 22), 205], [gt(2016, 9, 23), 250], [gt(2016, 9, 24), 230], [gt(2016, 9, 25), 245], [gt(2016, 9, 26), 260], [gt(2016, 9, 27), 290]
		];

		var gold = [
			[gt(2016, 9, 21), 100], [gt(2016, 9, 22), 110], [gt(2016, 9, 23), 155], [gt(2016, 9, 24), 120], [gt(2016, 9, 25), 135], [gt(2016, 9, 26), 150], [gt(2016, 9, 27), 175]
		];

		var platinum = [
			[gt(2016, 9, 21), 75], [gt(2016, 9, 22), 65], [gt(2016, 9, 23), 80], [gt(2016, 9, 24), 60], [gt(2016, 9, 25), 65], [gt(2016, 9, 26), 80], [gt(2016, 9, 27), 110]
		];

		var plot = $.plot(placeholder, 
			[
				{
					data: basic,
					label: "Basic"
				},
				{
					data: gold,
					label: "Gold"
				},
				{
					data: platinum,
					label: "Platinum"
				}
			], 
			{
				bars: {
					show: true,
					barWidth: 15*60*60*300,
					fill: true,
					order: true,
					lineWidth: 0,
					fillColor: { colors: [ { opacity: 1 }, { opacity: 1 } ] }
				},
				grid: {
					hoverable: true, 
					clickable: true,
					borderWidth: 0,
					tickColor: "#E4E4E4",
					
				},
				colors: ["#d9d9d9", "#5399D6", "#d7ea2b"],
				yaxis: {
					font: { color: "#555" },
				},
				xaxis: {
					mode: "time",
					timezone: "browser",
					minTickSize: [1, "day"],
					timeformat: "%a",
					font: { color: "#555" },
					tickColor: "#fafafa",
					autoscaleMargin: 0.2
				},
				legend: {
					labelBoxBorderColor: "transparent",
					backgroundColor: "transparent"
				},
				tooltip: true,
				tooltipOpts: {
					content: '%s: %y'
				}
			}
		);
	}

	// init flot chart: horizontal bar chart
	function chartBarHorizontal(placeholder) {
		var basic = [
			[188, 1], [200, 2], [225, 3], [230, 4], [250, 5]
		];

		var gold = [
			[200, 1], [220, 2], [210, 3], [240, 4], [240, 5]
		];

		var platinum = [
			[100, 1], [90, 2], [150, 3], [200, 4], [235, 5]
		];

		var plot = $.plot(placeholder, 
			[
				{
					data: basic,
					label: "Basic"
				},
				{
					data: gold,
					label: "Gold"
				},
				{
					data: platinum,
					label: "Platinum"
				}
			], 
			{
				bars: {
					show: true,
					horizontal: true,
					barWidth: 0.2,
					fill: true,
					order: true,
					lineWidth: 0,
					fillColor: { colors: [ { opacity: 1 }, { opacity: 1 } ] }
				},
				grid: {
					hoverable: true, 
					clickable: true,
					borderWidth: 0,
					tickColor: "#E4E4E4",
					
				},
				colors: ["#d9d9d9", "#5399D6", "#d7ea2b"],
				xaxis: {
					autoscaleMargin: 0.2
				},
				legend: {
					labelBoxBorderColor: "transparent",
					backgroundColor: "transparent"
				},
				tooltip: true,
				tooltipOpts: {
					content: '%s: %x'
				}
			}
		);
	}

	// init interactive flot chart: toggle on/off data series
	function chartToggleSeries(placeholder) {

		var datasets = {
			"usa": {
				label: "USA",
				data: [[1988, 483994], [1989, 479060], [1990, 457648], [1991, 401949], [1992, 424705], [1993, 402375], [1994, 377867], [1995, 357382], [1996, 337946], [1997, 336185], [1998, 328611], [1999, 329421], [2000, 342172], [2001, 344932], [2002, 387303], [2003, 440813], [2004, 480451], [2005, 504638], [2006, 528692]]
			},
			"russia": {
				label: "Russia",
				data: [[1988, 218000], [1989, 203000], [1990, 171000], [1992, 42500], [1993, 37600], [1994, 36600], [1995, 21700], [1996, 19200], [1997, 21300], [1998, 13600], [1999, 14000], [2000, 19100], [2001, 21300], [2002, 23600], [2003, 25100], [2004, 26100], [2005, 31100], [2006, 34700]]
			},
			"uk": {
				label: "UK",
				data: [[1988, 62982], [1989, 62027], [1990, 60696], [1991, 62348], [1992, 58560], [1993, 56393], [1994, 54579], [1995, 50818], [1996, 50554], [1997, 48276], [1998, 47691], [1999, 47529], [2000, 47778], [2001, 48760], [2002, 50949], [2003, 57452], [2004, 60234], [2005, 60076], [2006, 59213]]
			},
			"germany": {
				label: "Germany",
				data: [[1988, 55627], [1989, 55475], [1990, 58464], [1991, 55134], [1992, 52436], [1993, 47139], [1994, 43962], [1995, 43238], [1996, 42395], [1997, 40854], [1998, 40993], [1999, 41822], [2000, 41147], [2001, 40474], [2002, 40604], [2003, 40044], [2004, 38816], [2005, 38060], [2006, 36984]]
			},
			"denmark": {
				label: "Denmark",
				data: [[1988, 3813], [1989, 3719], [1990, 3722], [1991, 3789], [1992, 3720], [1993, 3730], [1994, 3636], [1995, 3598], [1996, 3610], [1997, 3655], [1998, 3695], [1999, 3673], [2000, 3553], [2001, 3774], [2002, 3728], [2003, 3618], [2004, 3638], [2005, 3467], [2006, 3770]]
			},
			"sweden": {
				label: "Sweden",
				data: [[1988, 6402], [1989, 6474], [1990, 6605], [1991, 6209], [1992, 6035], [1993, 6020], [1994, 6000], [1995, 6018], [1996, 3958], [1997, 5780], [1998, 5954], [1999, 6178], [2000, 6411], [2001, 5993], [2002, 5833], [2003, 5791], [2004, 5450], [2005, 5521], [2006, 5271]]
			},
			"norway": {
				label: "Norway",
				data: [[1988, 4382], [1989, 4498], [1990, 4535], [1991, 4398], [1992, 4766], [1993, 4441], [1994, 4670], [1995, 4217], [1996, 4275], [1997, 4203], [1998, 4482], [1999, 4506], [2000, 4358], [2001, 4385], [2002, 5269], [2003, 5066], [2004, 5194], [2005, 4887], [2006, 4891]]
			}
		};

		// hard-code color indices to prevent them from shifting as countries are turned on/off
		var i = 0;
		$.each(datasets, function(key, val) {
			val.color = i;
			++i;
		});

		// insert checkboxes 
		var choiceContainer = $("#choices");
		$.each( datasets, function( key, val ) {

			choiceContainer.append(
				"<label class='fancy-checkbox custom-bgcolor-green'><input type='checkbox' name='" + key + "' checked='checked' id='id" + key + "'><span for='id" + key + "'>" + val.label + "</span></label>"
			);
		});

		choiceContainer.find("input").click( function() {
			plotAccordingToChoices(placeholder, datasets);
		});

		plotAccordingToChoices(placeholder, datasets);
	}

	function plotAccordingToChoices(placeholder, datasets) {

		var data = [];

		$("#choices").find("input:checked").each(function () {
			var key = $(this).attr("name");
			if (key && datasets[key]) {
				data.push(datasets[key]);
			}
		});

		if (data.length > 0) {
			$.plot( placeholder, data, {
				series: {
					lines: {
						show: true,
						lineWidth: 2, 
						fill: false
					},
					points: {
						show: true, 
						lineWidth: 3,
						fill: true,
						fillColor: "#fafafa"
					},
					shadowSize: 0
				},

				grid: {
					hoverable: true, 
					clickable: true,
					borderWidth: 0,
					tickColor: "#E4E4E4",
				},
				xaxis: {
					tickDecimals: 0,
					autoscaleMargin: 0.1,
					tickColor: "#fafafa"
				},
				yaxis: {
					min: 0,
					max: 700000
				},
				colors: ["#d9d9d9", "#5399D6", "#d7ea2b", "#f30", "#E7A13D"],
				legend: {
					labelBoxBorderColor: "transparent",
					backgroundColor: "transparent",
					noColumns: 4
				},
				tooltip: true,
				tooltipOpts: {
					content: '%s: $%y'
				}
			});
		}
	}

	// init flot chart: select and zoom
	function chartSelectZoomSeries(placeholder) {

		var data = [{
			label: "United States",
			data: [[1990, 18.9], [1991, 18.7], [1992, 18.4], [1993, 19.3], [1994, 19.5], [1995, 19.3], [1996, 19.4], [1997, 20.2], [1998, 19.8], [1999, 19.9], [2000, 20.4], [2001, 20.1], [2002, 20.0], [2003, 19.8], [2004, 20.4]]
		}, {
			label: "Russia", 
			data: [[1992, 13.4], [1993, 12.2], [1994, 10.6], [1995, 10.2], [1996, 10.1], [1997, 9.7], [1998, 9.5], [1999, 9.7], [2000, 9.9], [2001, 9.9], [2002, 9.9], [2003, 10.3], [2004, 10.5]]
		}, {
			label: "United Kingdom",
			data: [[1990, 10.0], [1991, 11.3], [1992, 9.9], [1993, 9.6], [1994, 9.5], [1995, 9.5], [1996, 9.9], [1997, 9.3], [1998, 9.2], [1999, 9.2], [2000, 9.5], [2001, 9.6], [2002, 9.3], [2003, 9.4], [2004, 9.79]]
		}, {
			label: "Germany",
			data: [[1990, 12.4], [1991, 11.2], [1992, 10.8], [1993, 10.5], [1994, 10.4], [1995, 10.2], [1996, 10.5], [1997, 10.2], [1998, 10.1], [1999, 9.6], [2000, 9.7], [2001, 10.0], [2002, 9.7], [2003, 9.8], [2004, 9.79]]
		}, {
			label: "Denmark",
			data: [[1990, 9.7], [1991, 12.1], [1992, 10.3], [1993, 11.3], [1994, 11.7], [1995, 10.6], [1996, 12.8], [1997, 10.8], [1998, 10.3], [1999, 9.4], [2000, 8.7], [2001, 9.0], [2002, 8.9], [2003, 10.1], [2004, 9.80]]
		}, {
			label: "Sweden",
			data: [[1990, 5.8], [1991, 6.0], [1992, 5.9], [1993, 5.5], [1994, 5.7], [1995, 5.3], [1996, 6.1], [1997, 5.4], [1998, 5.4], [1999, 5.1], [2000, 5.2], [2001, 5.4], [2002, 6.2], [2003, 5.9], [2004, 5.89]]
		}];

		var options = {
			series: {
				lines: {
					show: true,
					lineWidth: 2, 
					fill: false
				},
				points: {
					show: true, 
					lineWidth: 3,
					fill: true,
					fillColor: "#fafafa"
				},
				shadowSize: 0
			},
			grid: {
				hoverable: true, 
				clickable: true,
				borderWidth: 0,
				tickColor: "#E4E4E4",
				
			},
			legend: {
				noColumns: 3,
				labelBoxBorderColor: "transparent",
				backgroundColor: "transparent"
			},
			xaxis: {
				tickDecimals: 0,
				tickColor: "#fafafa"
			},
			yaxis: {
				min: 0
			},
			colors: ["#d9d9d9", "#5399D6", "#d7ea2b", "#f30", "#E7A13D"],
			tooltip: true,
			tooltipOpts: {
				content: '%s: %y'
			},
			selection: {
				mode: "x"
			}
		};

		var plot = $.plot(placeholder, data, options);

		placeholder.bind("plotselected", function (event, ranges) {

			plot = $.plot(placeholder, data, $.extend(true, {}, options, {
				xaxis: {
					min: ranges.xaxis.from,
					max: ranges.xaxis.to
				}
			}));
		});

		$('#reset-chart-zoom').click( function() {
			plot.setSelection({
				xaxis: {
					from: 1990,
					to: 2004
				}
			});
		});
	}

	// init flot chart: real-time
	var plotOptions;
	function chartRealtTime(placeholder, type) {
		var dataset;
		var cpuData = [];
			totalPoints = 200;
			updateInterval = 1000; // 1000ms
			now = new Date().getTime();

		plotOptions = {
			series: {
				shadowSize: 0, // Drawing is faster without shadows
				lines: {
					fill: false
				},
			},
			grid: {
				borderWidth: 0
			},
			colors: ["#5399D6"],
			yaxis: {
				min: 0,
				max: 100,
				tickSize: 5,
				tickFormatter: function (v, axis) {
					if (v % 10 == 0) {
						return v + "%";
					} else {
						return "";
					}
				},
				tickColor: "#e4e4e4",
			},
			xaxis: {
				mode: "time",
				tickSize: [2, "second"],
				tickFormatter: function (v, axis) {
					var date = new Date(v);
		 
					if (date.getSeconds() % 20 == 0) {
						var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
						var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
						var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
		 
						return hours + ":" + minutes + ":" + seconds;
					} else {
						return "";
					}
				},
				tickColor: "transparent",
			},
			legend: {
				show: false
			}
		}

		if ( type == "area") {
			plotOptions.series.lines = {
				fill: true,
				fillColor: "#92D135"
			};

			plotOptions.colors = ["#72AC1C"];

		} else if ( type == "bar") {
			plotOptions.series.bars = {
				show: true,
				barWidth: 1,
				fill: false,
			}

			plotOptions.colors = ["#7d939a"];
		}

		getRandomData();
		dataset = [
			{ data: cpuData }
		];
		
		$.plot(placeholder, dataset, plotOptions);

		update();

		function update() {
			getRandomData();

			$.plot(placeholder, dataset, plotOptions);
			setTimeout(update, updateInterval);
		}

		function getRandomData() {

			cpuData.shift();

			while (cpuData.length < totalPoints) {
				var y = Math.random() * 100;
				var temp = [now += updateInterval, y];
		 
				cpuData.push(temp);
			}
		}
	}

	$('.btn-change-chart').click( function(){
		plotOptions.series.lines = {
			fill: true,
			fillColor: "#92D135"
		};

		plotOptions.colors = ["#72AC1C"];

	});

	if( $('#select-chart-type').length > 0) {
		$('#select-chart-type').multiselect({
			dropRight: true
		});

		$('#select-chart-type').change( function() {

			var chartType = $(this).val();

			if( chartType == 'area' ) {
				plotOptions.series.bars = {
					show: false,
				}

				plotOptions.series.lines = {
					fill: true,
					fillColor: "#92D135"
				};
				plotOptions.colors = ["#72AC1C"];

			}else if( chartType == 'bar') {
				plotOptions.series.bars = {
					show: true,
					barWidth: 1,
					fill: false,
				}
				plotOptions.colors = ["#F30"];

			}else if( chartType == 'line' ) {
				plotOptions.series.bars = {
					show: false,
				}

				plotOptions.series.lines = {
					fill: false,
				};
				plotOptions.colors = ["#5399D6"];

			}

		});
	}

	/* d3 charts: heatmap */
	if( $('#demo-d3-heatmap').length > 0 ) {

		var dataHeat = "assets/js/plugins/stat/data-heatmap.tsv"; // path/to/your/datafile.tsv
		var placeholderHeat = "#demo-d3-heatmap"; // chart placeholder or container

		var margin = { top: 50, right: 0, bottom: 100, left: 30 },
			width = 960 - margin.left - margin.right,
			height = 430 - margin.top - margin.bottom,
			gridSize = Math.floor(width / 24),
			legendElementWidth = gridSize*2,
			buckets = 9,
			colors = colorbrewer.YlOrRd[9],
			days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
			times = ["1a", "2a", "3a", "4a", "5a", "6a", "7a", "8a", "9a", "10a", "11a", "12a", "1p", "2p", "3p", "4p", "5p", "6p", "7p", "8p", "9p", "10p", "11p", "12p"];

		d3.tsv(dataHeat,
			function(d) {
				return {
					day: +d.day,
					hour: +d.hour,
					value: +d.value
				};
			},

			function(error, data) {
				var colorScale = d3.scale.quantile()
					.domain([0, buckets - 1, d3.max(data, function (d) { return d.value; })])
					.range(colors);
				
				var svg = d3.select(placeholderHeat).append("svg")
					.attr("width", width + margin.left + margin.right)
					.attr("height", height + margin.top + margin.bottom)
					.attr('viewBox','0 0 '+ width +' '+ (height + margin.top + margin.bottom))
					.attr('preserveAspectRatio','xMidYMid')
					.append("g")
					.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

				var dayLabels = svg.selectAll(".dayLabel")
					.data(days)
					.enter().append("text")
					.text(function (d) { return d; })
					.attr("x", 0)
					.attr("y", function (d, i) { return i * gridSize; })
					.style("text-anchor", "end")
					.attr("transform", "translate(-6," + gridSize / 1.5 + ")")
					.attr("class", function (d, i) { return ((i >= 0 && i <= 4) ? "dayLabel mono axis axis-workweek" : "dayLabel mono axis"); });

				var timeLabels = svg.selectAll(".timeLabel")
					.data(times)
					.enter().append("text")
					.text(function(d) { return d; })
					.attr("x", function(d, i) { return i * gridSize; })
					.attr("y", 0)
					.style("text-anchor", "middle")
					.attr("transform", "translate(" + gridSize / 2 + ", -6)")
					.attr("class", function(d, i) { return ((i >= 7 && i <= 16) ? "timeLabel mono axis axis-worktime" : "timeLabel mono axis"); });

				var heatMap = svg.selectAll(".hour")
					.data(data)
					.enter().append("rect")
					.attr("x", function(d) { return (d.hour - 1) * gridSize; })
					.attr("y", function(d) { return (d.day - 1) * gridSize; })
					.attr("rx", 4)
					.attr("ry", 4)
					.attr("class", "hour bordered")
					.attr("width", gridSize)
					.attr("height", gridSize)
					.style("fill", colors[0]);

				heatMap.transition().duration(1000).style("fill", function(d) { return colorScale(d.value); });
				heatMap.append("title").text(function(d) { return d.value; });
				  
				var legend = svg.selectAll(".legend")
					.data([0].concat(colorScale.quantiles()), function(d) { return d; })
					.enter().append("g")
					.attr("class", "legend");

				legend.append("rect")
					.attr("x", function(d, i) { return legendElementWidth * i; })
					.attr("y", height)
					.attr("width", legendElementWidth)
					.attr("height", gridSize / 2)
					.style("fill", function(d, i) { return colors[i]; });

				legend.append("text")
					.attr("class", "mono")
					.text(function(d) { return "≥ " + Math.round(d); })
					.attr("x", function(d, i) { return legendElementWidth * i; })
					.attr("y", height + gridSize);
			}
		);
	}

	/* d3 chart: bar chart with negative values */
	if( $('#demo-d3-barchart').length > 0 ) {
		var dataBar = "assets/js/plugins/stat/data-barchart.tsv"; // path/to/your/datafile.tsv
		var placeholderBar = "#demo-d3-barchart"; // placeholder or container
	
		var marginBar = {top: 30, right: 10, bottom: 10, left: 10},
			widthBar = 960 - marginBar.left - marginBar.right,
			heightBar = 500 - marginBar.top - marginBar.bottom;

		var x = d3.scale.linear().range([0, widthBar]);
		var y = d3.scale.ordinal().rangeRoundBands([0, heightBar], .2);

		var xAxis = d3.svg.axis()
			.scale(x)
			.orient("top");

		var svg = d3.select(placeholderBar).append("svg")
			.attr("width", widthBar + marginBar.left + marginBar.right)
			.attr("height", heightBar + marginBar.top + marginBar.bottom)
			.attr('viewBox','0 0 '+ width +' '+ (heightBar + margin.top + margin.bottom))
			.attr('preserveAspectRatio','xMidYMid')
			.append("g")
			.attr("transform", "translate(" + marginBar.left + "," + marginBar.top + ")");

		d3.tsv(dataBar, 
			function(d) {
				d.value = +d.value;
				return d;
			}, 

			function(error, data) {
				x.domain(d3.extent(data, function(d) { return d.value; })).nice();
				y.domain(data.map(function(d) { return d.name; }));

			svg.selectAll(".bar")
				.data(data)
				.enter().append("rect")
				.attr("class", function(d) { return d.value < 0 ? "bar negative" : "bar positive"; })
				.attr("x", function(d) { return x(Math.min(0, d.value)); })
				.attr("y", function(d) { return y(d.name); })
				.attr("width", function(d) { return Math.abs(x(d.value) - x(0)); })
				.attr("height", y.rangeBand());

			svg.append("g")
				.attr("class", "x axis")
				.call(xAxis);

			svg.append("g")
				.attr("class", "y axis")
				.append("line")
				.attr("x1", x(0))
				.attr("x2", x(0))
				.attr("y2", heightBar);
			}
		);
	}


	//*******************************************
	/*	DONUT CHART
	/********************************************/

	var theme = {
          color: [
              '#26B99A', '#34495E', '#BDC3C7', '#3498DB',
              '#9B59B6', '#8abb6f', '#759c6a', '#bfd3b7'
          ],

          title: {
              itemGap: 8,
              textStyle: {
                  fontWeight: 'normal',
                  color: '#408829'
              }
          },

          dataRange: {
              color: ['#1f610a', '#97b58d']
          },

          toolbox: {
              color: ['#408829', '#408829', '#408829', '#408829']
          },

          tooltip: {
              backgroundColor: 'rgba(0,0,0,0.5)',
              axisPointer: {
                  type: 'line',
                  lineStyle: {
                      color: '#408829',
                      type: 'dashed'
                  },
                  crossStyle: {
                      color: '#408829'
                  },
                  shadowStyle: {
                      color: 'rgba(200,200,200,0.3)'
                  }
              }
          },

          dataZoom: {
              dataBackgroundColor: '#eee',
              fillerColor: 'rgba(64,136,41,0.2)',
              handleColor: '#408829'
          },
          grid: {
              borderWidth: 0
          },

          categoryAxis: {
              axisLine: {
                  lineStyle: {
                      color: '#408829'
                  }
              },
              splitLine: {
                  lineStyle: {
                      color: ['#eee']
                  }
              }
          },

          valueAxis: {
              axisLine: {
                  lineStyle: {
                      color: '#408829'
                  }
              },
              splitArea: {
                  show: true,
                  areaStyle: {
                      color: ['rgba(250,250,250,0.1)', 'rgba(200,200,200,0.1)']
                  }
              },
              splitLine: {
                  lineStyle: {
                      color: ['#eee']
                  }
              }
          },
          timeline: {
              lineStyle: {
                  color: '#408829'
              },
              controlStyle: {
                  normal: {color: '#408829'},
                  emphasis: {color: '#408829'}
              }
          },

          k: {
              itemStyle: {
                  normal: {
                      color: '#68a54a',
                      color0: '#a9cba2',
                      lineStyle: {
                          width: 1,
                          color: '#408829',
                          color0: '#86b379'
                      }
                  }
              }
          },
        
          force: {
              itemStyle: {
                  normal: {
                      linkStyle: {
                          strokeColor: '#408829'
                      }
                  }
              }
          },
          chord: {
              padding: 4,
              itemStyle: {
                  normal: {
                      lineStyle: {
                          width: 1,
                          color: 'rgba(128, 128, 128, 0.5)'
                      },
                      chordStyle: {
                          lineStyle: {
                              width: 1,
                              color: 'rgba(128, 128, 128, 0.5)'
                          }
                      }
                  },
                  emphasis: {
                      lineStyle: {
                          width: 1,
                          color: 'rgba(128, 128, 128, 0.5)'
                      },
                      chordStyle: {
                          lineStyle: {
                              width: 1,
                              color: 'rgba(128, 128, 128, 0.5)'
                          }
                      }
                  }
              }
          },
  
          textStyle: {
              fontFamily: 'Arial, Verdana, sans-serif'
          }
      };

	function populateCategoryPieChart(user)
	{
		  var dataKey= user +'_top_category_donut_chart_data';
		  var categoryData = window[dataKey];
		  var categoryPie = echarts.init(document.getElementById('demo-donut-chart-category'), theme);
		  
		  categoryPie.setOption({
			tooltip: {
			  trigger: 'item',
			  formatter: "{a} <br/>{b} : {c} ({d}%)"
			},
			toolbox: {
			  show: true,
			  feature: {
				magicType: {
				  show: true,
				  type: ['pie', 'funnel']
				}
			  }
			},
			calculable: true,
			series: [{
			  name: 'Category',
			  type: 'pie',
			  radius: [25, 80],
			  center: ['50%', 100],
			  roseType: 'area',
			  x: '50%',
			  max: 40,
			  sort: 'ascending',
			  data: categoryData
			}]
		  });

		categoryPie.on('click', function (params) {
			populateTransactionsForCategory(user+'_'+params.data.name)
		}); 
	}


    function populateMerchantPieChart(user)
	{
		var dataKey= user +'_top_merchant_donut_chart_data';
		var merchantData = window[dataKey];

		var merchantPie = echarts.init(document.getElementById('demo-donut-chart-merchant'), theme);
		  
		  merchantPie.setOption({
			tooltip: {
			  trigger: 'item',
			  formatter: "{a} <br/>{b} : {c} ({d}%)"
			},
			toolbox: {
			  show: true,
			  feature: {
				magicType: {
				  show: true,
				  type: ['pie', 'funnel']
				}
			  }
			},
			calculable: true,
			series: [{
			  name: 'Category',
			  type: 'pie',
			  radius: [25, 80],
			  center: ['50%', 100],
			  roseType: 'area',
			  x: '50%',
			  max: 40,
			  sort: 'ascending',
			  data: merchantData
			}]
		  });

		merchantPie.on('click', function (params) {
			populateTransactionsForMerchants(user+'_'+params.data.name)
		});
	}
	  
	function populateTransactionsForMerchants(labelname)
	{
		$('#demo-donut-chart-merchant').hide();
		var rows = "";
		labelname=labelname.toLowerCase().replace(/ /g, '');
		labelname=labelname+'_transactions';
		var transaction_items=window[labelname];

		for (i = 0; i < transaction_items.length; i++) { 
			rows += "<tr><td>" + transaction_items[i].TDate + "</td><td>" + transaction_items[i].Description + "</td><td>" + transaction_items[i].Amount + "</td></tr>";
		}

		$( rows ).appendTo( "#merchantTransactionTable tbody" );
		$('#merchantTransactionTablediv').show();
	}
	
	 $('#merchantTransactionWidgetHeader h3').on('click', function() {
       $('#merchantTransactionTablediv').hide();
	   $( "#merchantTransactionTable tbody" ).empty();
	    $('#demo-donut-chart-merchant').show();
		populateMerchantPieChart(user);
    });

	  
	function populateTransactionsForCategory(labelname)
	{
		$('#demo-donut-chart-category').hide();
		var rows = "";
		labelname=labelname.toLowerCase().replace(/ /g, '');
		labelname=labelname+'_transactions';
		var transaction_items=window[labelname];

		for (i = 0; i < transaction_items.length; i++) { 
			rows += "<tr><td>" + transaction_items[i].TDate + "</td><td>" + transaction_items[i].Description + "</td><td>" + transaction_items[i].Amount + "</td></tr>";
		}

		$( rows ).appendTo( "#categoryTransactionTable tbody" );
		$('#categoryTransactionTablediv').show();
	}
	
	 $('#categoryTransactionWidgetHeader h3').on('click', function() {
       $('#categoryTransactionTablediv').hide();
	   $( "#categoryTransactionTable tbody" ).empty();
	    $('#demo-donut-chart-category').show();
		populateCategoryPieChart(user);
    });
}); // end ready function