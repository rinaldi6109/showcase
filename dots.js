jQuery(document).ready(function() {
    // Grab the data
    var data = [],
        axisx = [],
        axisy = [],
		row=[],
		col=[],
        table = jQuery("#for-chart");
    jQuery("tbody td:not(.tot)", table).each(function (i) {
        data.push(parseFloat(jQuery(this).text(), 10));
//		console.log(i);
    });
//    table.hide();
    jQuery("tbody th:not(.tot)", table).each(function () {
        axisy.push(jQuery(this).text());
    });
    jQuery("thead th:not(.tot)", table).each(function () {
        axisx.push(jQuery(this).text());
    });
    // Draw
	

	
	
	
	Highcharts.setOptions({
		chart: {
			defaultSeriesType:'line',
			borderWidth:0,
			borderRadius:0,
			backgroundColor:'rgba(255, 255, 255, 0.1)',
		},
		credits:{enabled:false},
		exporting:{enabled:false},
		title:{text:''},
		tooltip:{
			enabled:true,
			formatter: function() {
						return Math.round(this.x*1000)/10+"%";
						}
		},
		legend:{enabled:false},
		plotOptions:{
			series:{
				enableMouseTracking:true,
				shadow:false,
				marker:{
					enabled:true,
					symbol:'circle'
				},
				borderWidth:0,
				groupPadding:0,
				pointPadding:0.05
			},
		},
		xAxis: {
			title:{text:''},
			lineWidth:0,
			tickWidth:0,
			labels:{
				enabled:false
			},
			min:0,
			max:0.85,
		},
		yAxis:{
			title:{text:''},
			lineWidth:1,
			tickWidth:1,
			gridLineWidth:1,
			min:0,
			max:11,
			labels:{
				enabled:false
			},
//			minTickInterval:1,
			tickInterval:1
		},
	});
    
	alert("1!");
	var sm=[],k=0;
	var box=document.getElementById("legendx1");
	for (var i=0;i<2;i++) {
		var div=document.createElement("div");
		div.setAttribute("style","margin-left:10px;width:80px;height:200px;float:left");
		div.id="hclegx"+i;
		box.appendChild(div);
		sm[k++] = new Highcharts.Chart({
			chart:{renderTo:'hclegx'+i},
			xAxis: {title:{text:'.',style:{color:'rgba(0,0,0,0)'}}},
			yAxis: {
				labels: {
					step:1,
					enabled:true,
					formatter: function() {
						var value = axisx[axisx.length-1-this.value];
						return value !== 'undefined' ? value : this.value;
						}
					},
			},
			series:[{type: 'scatter',data:[]}]
		});
	}
	
	var box=document.getElementById("scatter1");
	for (var i=0;i<10;i++) {
	}
	for (var i=0;i<10;i++) {
		var div=document.createElement("div");
		div.setAttribute("style","width:120px;height:200px;float:left");
		div.id="hcx"+i;
		box.appendChild(div);
		var perc=[];
		for (j=0;j<12;j++) {
			perc.push([data[i*12+j]/tot_row[i],axisx.length-1-j]);
			if (i==1) {
			//console.log(data[i*12+j]);
			//console.log(tot_row[i]);
			//console.log(axisx.length-1-j);
			}			
//			if (i==0) alert(data[i*12+j]+"/"+tot_row[i]);
			sm[k++] = new Highcharts.Chart({
				chart:{renderTo:'hcx'+i},
				xAxis: {title:{text:axisy[i]}},
				series:[
				{type: 'scatter',data:mprov,color:'rgba(0,0,0,0.25)',marker:{fillColor:'rgba(255,255,255,0)',lineWidth: 1,lineColor: null}},
				{type: 'scatter',data:perc}
				]
			});
		}
	}

	Highcharts.setOptions({
		xAxis: {
			title:{text:''},
			lineWidth:0,
			tickWidth:0,
			labels:{
				enabled:false
			},
			min:0,
			max:0.4,
		},
		yAxis:{
			title:{text:''},
			lineWidth:1,
			tickWidth:1,
			gridLineWidth:1,
			min:0,
			max:9,
			labels:{
				enabled:false
			},
//			minTickInterval:1,
			tickInterval:1
		},
	});
	
	var box=document.getElementById("legendx2");
	for (var i=0;i<2;i++) {
		var div=document.createElement("div");
		div.setAttribute("style","margin-left:10px;width:80px;height:200px;float:left");
		div.id="hclegy"+i;
		box.appendChild(div);
		sm[k++] = new Highcharts.Chart({
			chart:{renderTo:'hclegy'+i},
			xAxis: {title:{text:'.',style:{color:'rgba(0,0,0,0)'}}},
			yAxis: {
				labels: {
					step:1,
					enabled:true,
					formatter: function() {
						var value = axisy[axisy.length-1-this.value];
						return value !== 'undefined' ? value : this.value;
						}
					},
			},
			series:[{type: 'scatter',data:[]}]
		});
	}
	
	var box=document.getElementById("scatter2");
	for (var i=0;i<10;i++) {
	}
	for (var i=0;i<12;i++) {
		var div=document.createElement("div");
		div.setAttribute("style","width:100px;height:200px;float:left");
		div.id="hcy"+i;
		box.appendChild(div);
		var perc=[];
		for (j=0;j<10;j++) {
			perc.push([data[i+j*12]/tot_col[i],axisy.length-1-j]);
//			if (i==0) alert(data[i+j*12]+"/"+tot_col[i]);
			if (i==1) {
			//console.log(data[i*12+j]);
			//console.log(tot_row[i]);
			//console.log(axisx.length-1-j);
			}			
			sm[k++] = new Highcharts.Chart({
				chart:{renderTo:'hcy'+i},
				xAxis: {title:{text:axisx[i]}},
				series:[
				{type: 'scatter',data:mnaz,color:'rgba(0,0,0,0.25)',marker:{fillColor:'rgba(255,255,255,0)',lineWidth: 1,lineColor: null}},
				{type: 'scatter',data:perc,color:'#ff0000'}
				]
			});
		}
	}


	

});
