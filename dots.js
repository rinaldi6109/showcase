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
    var width = 700,
        height = 500,
        leftgutter = 80,
        bottomgutter = 20,
        r = Raphael("chart", width, height),
        txt = {"font": '12px verdana, arial, serif', stroke: "none", fill: "#000"},
        X = (width - leftgutter) / axisx.length,
        Y = (height - bottomgutter) / axisy.length,
        color = jQuery("#chart").css("color"),
        max = Math.round(X / 2) - 1,
		trow=[],tcol=[];
    // r.rect(0, 0, width, height, 5).attr({fill: "#000", stroke: "none"});
	//r.attr({"border": '1px solid red'});
	var alt;
    for (var i = 0, ii = axisx.length; i < ii; i++) {
		alt=leftgutter + X * (i + .5);
		//r.attr({"stroke":"#f00","stroke-width":1});
		r.path("M" + (alt-0.5*X)+ " 0 L" +(alt-0.5*X) + " " + (height)).attr({"stroke":"#ddd","stroke-width":1});
        r.text(alt, 10, axisx[i]).attr(txt);
    }
    for (var i = 0, ii = axisy.length; i <= ii; i++) {
		alt=Y * (i + .5)+20;
		r.path("M0 " + (alt-0.5*Y)+ "L" + (width) + " " +(alt-0.5*Y)).attr({"stroke":"#ddd","stroke-width":1});
        if (i<ii) r.text(40, alt, axisy[i]).attr(txt);
    }
	
	var tot_row=new Array(axisy.length-1);
	var tot_col=new Array(axisx.length-1);
    for (var j = 0, jj = axisx.length; j < jj; j++) {
		tot_col[j]=0;
	}
	var tot=0, o = 0, d;
    for (var i = 0, ii = axisy.length; i < ii; i++) {
	tot_row[i]=0;
        for (var j = 0, jj = axisx.length; j < jj; j++) {
			d = data[o] || 0;
			tot_row[i]=tot_row[i]+d;
			tot_col[j]=tot_col[j]+d;
			tot=tot+d;
			o++
		}
	}	
	var mprov=[];
    for (var j = 0, jj = axisx.length; j < jj; j++) {
		mprov.push([tot_col[j]/tot,axisx.length-1-j]);
//		console.log(tot_col[j]/tot);
	}
	var mnaz=[];
    for (var j = 0, jj = axisy.length; j < jj; j++) {
		mnaz.push([tot_row[j]/tot,axisy.length-1-j]);
//		console.log(tot_col[j]/tot);
	}
//    console.log(tot);
//	console.log(tot_col[0]);
//	console.log(tot_row[0]);
	var o = 0, d, rapp;
    for (var i = 0, ii = axisy.length; i < ii; i++) {
        for (var j = 0, jj = axisx.length; j < jj; j++) {
            var R = data[o] && Math.min(Math.round(Math.sqrt(data[o] / Math.PI) * 0.25), max);
			d = data[o] || 0;
			rapp =d/(tot_col[j]*tot_row[i]/tot)-1;
			var S = 1/(1+Math.exp(((rapp>0) ? 2 : 6)*(rapp)));
//			if (rapp>1) {S=0} else
//			if (rapp>0.5) {S=0.30} else
//			if (rapp>0) {S=0.60} else
//			if (rapp>-0.5) {S=0.75} else {S=0.90};
//			var S = 1/(1+Math.exp(((rapp>0) ? 1 : 3)*(rapp)));
            if (R) {
                (function (dx, dy, R, value) {
//                    var color = "hsb(" + [(1 - R / max) * .6, 1, .8] + ")";
//                    var color = "hsb(" + [1, 0, S] + ")";
                    var color = "hsb(" + [S*200/360, 1, .8] + ")";
                    var dt = r.circle(dx + 60 + R, dy + 30, R).attr({stroke: "none", fill: color});
                    if (R < 6) {
                        var bg = r.circle(dx + 60 + R, dy + 30, 6).attr({stroke: "none", fill: "#000", opacity: 0.4}).hide();
                    }
                    var lbl = r.text(dx + 60 + R, dy + 30, data[o]+"\n("+((rapp>0) ? "+" : "") +Math.round(rapp*100)+"%)")
                            .attr({"font": '9px verdana, arial, serif', stroke: "none", fill: "#000"}).hide();
                    var dot = r.circle(dx + 60 + R, dy + 30, max).attr({stroke: "none", fill: "#000", opacity: 0});
                    dot[0].onmouseover = function () {
                        if (bg) {
                            //bg.show();
                        } else {
                            //var clr = Raphael.rgb2hsb(color);
                            //clr.b = .5;
                            //dt.attr("fill", Raphael.hsb2rgb(clr).hex);
                        }
						//bg
						dt.attr({opacity: 0.25});
                        lbl.show();
                    };
                    dot[0].onmouseout = function () {
                        if (bg) {
                            //bg.hide();
                        } else {
                        //    dt.attr("fill", color);
                        }
						dt.attr({opacity: 1});
                        lbl.hide();
                    };
                })(leftgutter + X * (j + .5) - 60 - R, Y * (i + .5) - 10, R, data[o]);
            }
            o++;
        }
    }
	
	var r = Raphael("legend", 200, 50);
	var legend=[-0.5,0,0.5,1];
    for (var i = 0; i < legend.length; i++) {
		color="hsb(" + [200/360/(1+Math.exp(((legend[i]>0) ? 2 : 6)*legend[i])), 1, .8] + ")";
		r.rect(5+i*40,20,35,5).attr({stroke: "none", fill: color});
		r.text(20+i*40,10,((legend[i]>0) ? "+" : "")+(legend[i]*100)+"%").attr(txt).attr({"font-size":'9px'});
	}
	

	
	
	
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
