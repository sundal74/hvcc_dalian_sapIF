
nv.models.line = function() {

  //============================================================
  // Public Variables with Default Settings
  //------------------------------------------------------------

  var  scatter = nv.models.scatter()
    ;

  var margin = {top: 0, right: 0, bottom: 0, left: 0}
    , width = 960
    , height = 500
    , color = nv.utils.defaultColor() // a function that returns a color
    , getX = function(d) { return d.x } // accessor to get the x value from a data point
    , getY = function(d) { return d.y } // accessor to get the y value from a data point
    , defined = function(d,i) { return !isNaN(getY(d,i)) && getY(d,i) !== null } // allows a line to be not continous when it is not defined
    , isArea = function(d) { return d.area } // decides if a line is an area or just a line
    , clipEdge = false // if true, masks lines within x and y scale
    , x //can be accessed via chart.xScale()
    , y //can be accessed via chart.yScale()
    , interpolate = "linear" // controls the line interpolation
    , getAreaY0 = function(d, i, part){
    	return getY(d,i)*part
    }
    , getAreaY1 = function(d, i, part){
    	if(d.id=='ucl'){
    		return d.cl + (getY(d,i)-d.cl)*part;
    	}else if(d.id=='lcl'){
    		return d.cl + (getY(d,i)-d.cl)*part;
    	}else{
    		return y.domain()[0] <= 0 ? y.domain()[1] >= 0 ? 0 : y.domain()[1] : y.domain()[0];	
    	}
    }
    ;

  scatter
    .size(16) // default size
    .sizeDomain([16,256]) //set to speed up calculation, needs to be unset if there is a custom size accessor
    ;

  //============================================================


  //============================================================
  // Private Variables
  //------------------------------------------------------------

  var x0, y0 //used to store previous scales
      ;

  //============================================================


  function chart(selection) {
    selection.each(function(data) {
      var availableWidth = width - margin.left - margin.right,
          availableHeight = height - margin.top - margin.bottom,
          container = d3.select(this);

      //------------------------------------------------------------
      // Setup Scales

      x = scatter.xScale();
      y = scatter.yScale();

      x0 = x0 || x;
      y0 = y0 || y;

      //------------------------------------------------------------


      //------------------------------------------------------------
      // Setup containers and skeleton of chart

      var wrap = container.selectAll('g.nv-wrap.nv-line').data([data]);
      var wrapEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap nv-line');
      var defsEnter = wrapEnter.append('defs');
      var gEnter = wrapEnter.append('g');
      var g = wrap.select('g')

      gEnter.append('g').attr('class', 'nv-groups');
      gEnter.append('g').attr('class', 'nv-scatterWrap');

      wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

      //------------------------------------------------------------
      scatter
        .width(availableWidth)
        .height(availableHeight)

      var scatterWrap = wrap.select('.nv-scatterWrap');
          //.datum(data); // Data automatically trickles down from the wrap

      d3.transition(scatterWrap).call(scatter);

      defsEnter.append('clipPath')
          .attr('id', 'nv-edge-clip-' + scatter.id())
        .append('rect');

      wrap.select('#nv-edge-clip-' + scatter.id() + ' rect')
          .attr('width', availableWidth)
          .attr('height', availableHeight);

      g   .attr('clip-path', clipEdge ? 'url(#nv-edge-clip-' + scatter.id() + ')' : '');
      scatterWrap
          .attr('clip-path', clipEdge ? 'url(#nv-edge-clip-' + scatter.id() + ')' : '');

          
      var groups = wrap.select('.nv-groups').selectAll('.nv-group')
          .data(function(d) { return d }, function(d) { return d.key });
      groups.enter().append('g')
          .style('stroke-opacity', 1e-6)
          .style('fill-opacity', 1e-6);
      d3.transition(groups.exit())
          .style('stroke-opacity', 1e-6)
          .style('fill-opacity', 1e-6)
          .remove();
      groups
          .attr('class', function(d,i) { return 'nv-group nv-series-' + i })
          .classed('hover', function(d) { return d.hover })
          .style('fill', function(d,i){ return color(d, i) })
          .style('stroke', function(d,i){ return color(d, i)});
      d3.transition(groups)
          .style('stroke-opacity', 1)
          .style('fill-opacity', .5);


	/*
      var areaPaths = groups.selectAll('path.nv-area')
          .data(function(d) { return isArea(d) ? [d] : [] }); // this is done differently than lines because I need to check if series is an area
      areaPaths.enter().append('path')
          .attr('class', 'nv-area')
          .attr('d', function(d) {
            return d3.svg.area()
                .interpolate(interpolate)
                .defined(defined)
                .x(function(d,i) { return x0(getX(d,i)) })
                .y0(function(d,i) { return y0(getAreaY0(d,i, 1)) })
                .y1(function(d,i) { return y0( getAreaY1(d, i, 2/3)) })
                //.y1(function(d,i) { return y0(0) }) //assuming 0 is within y domain.. may need to tweak this
                .apply(this, [d.values])
          });
      d3.transition(groups.exit().selectAll('path.nv-area'))
          .attr('d', function(d) {
            return d3.svg.area()
                .interpolate(interpolate)
                .defined(defined)
                .x(function(d,i) { return x0(getX(d,i)) })
                .y0(function(d,i) { return y0(getY(d,i)) })
                .y1(function(d,i) { return y0( y.domain()[0] <= 0 ? y.domain()[1] >= 0 ? 0 : y.domain()[1] : y.domain()[0] ) })
                //.y1(function(d,i) { return y0(0) }) //assuming 0 is within y domain.. may need to tweak this
                .apply(this, [d.values])
          });
      d3.transition(areaPaths)
          .attr('d', function(d) {
            return d3.svg.area()
                .interpolate(interpolate)
                .defined(defined)
                .x(function(d,i) { return x0(getX(d,i)) })
                .y0(function(d,i) { return y0(getAreaY0(d,i, 1)) })
                .y1(function(d,i) { return y0( getAreaY1(d, i, 2/3)) })
                //.y1(function(d,i) { return y0(0) }) //assuming 0 is within y domain.. may need to tweak this
                .apply(this, [d.values])
          });

      d3.transition(areaPaths)
         .style('fill', function(d,i) { 
         	return "#FF0000" 
         });
      d3.transition(areaPaths)
         .style('fill-opacity', function(d,i) { 
         	return .15
         });  
         
     
     var areaPaths2 = groups.selectAll('path.nv-area2')
          .data(function(d) { return isArea(d) ? [d] : [] }); // this is done differently than lines because I need to check if series is an area
      areaPaths2.enter().append('path')
          .attr('class', 'nv-area')
          .attr('d', function(d) {
            return d3.svg.area()
                .interpolate(interpolate)
                .defined(defined)
                .x(function(d,i) { return x0(getX(d,i)) })
                .y0(function(d,i) { return y0( getAreaY1(d, i, 1/3)) })
                .y1(function(d,i) { return y0( getAreaY1(d, i, 2/3)) })
                //.y1(function(d,i) { return y0(0) }) //assuming 0 is within y domain.. may need to tweak this
                .apply(this, [d.values])
          });
      d3.transition(groups.exit().selectAll('path.nv-area2'))
          .attr('d', function(d) {
            return d3.svg.area()
                .interpolate(interpolate)
                .defined(defined)
                .x(function(d,i) { return x0(getX(d,i)) })
                .y0(function(d,i) { return y0(getY(d,i)) })
                .y1(function(d,i) { return y0( y.domain()[0] <= 0 ? y.domain()[1] >= 0 ? 0 : y.domain()[1] : y.domain()[0] ) })
                //.y1(function(d,i) { return y0(0) }) //assuming 0 is within y domain.. may need to tweak this
                .apply(this, [d.values])
          });
      d3.transition(areaPaths2)
          .attr('d', function(d) {
            return d3.svg.area()
                .interpolate(interpolate)
                .defined(defined)
                .x(function(d,i) { return x0(getX(d,i)) })
                .y0(function(d,i) { return y0( getAreaY1(d, i, 1/3)) })
                .y1(function(d,i) { return y0( getAreaY1(d, i, 2/3)) })
                //.y1(function(d,i) { return y0(0) }) //assuming 0 is within y domain.. may need to tweak this
                .apply(this, [d.values])
          });

      d3.transition(areaPaths2)
         .style('fill', function(d,i) { 
         	return "#FFFF00" 
         })
      d3.transition(areaPaths2)
         .style('fill-opacity', function(d,i) { 
         	return .15
         });
         
         
      var areaPaths3 = groups.selectAll('path.nv-area3')
          .data(function(d) { return isArea(d) ? [d] : [] }); // this is done differently than lines because I need to check if series is an area
      areaPaths3.enter().append('path')
          .attr('class', 'nv-area')
          .attr('d', function(d) {
            return d3.svg.area()
                .interpolate(interpolate)
                .defined(defined)
                .x(function(d,i) { return x0(getX(d,i)) })
                .y0(function(d,i) { return y0(getAreaY1(d,i, 1/3)) })
                .y1(function(d,i) { return y0( d.cl) })
                //.y1(function(d,i) { return y0(0) }) //assuming 0 is within y domain.. may need to tweak this
                .apply(this, [d.values])
          });
      d3.transition(groups.exit().selectAll('path.nv-area3'))
          .attr('d', function(d) {
            return d3.svg.area()
                .interpolate(interpolate)
                .defined(defined)
                .x(function(d,i) { return x0(getX(d,i)) })
                .y0(function(d,i) { return y0(getY(d,i)) })
                .y1(function(d,i) { return y0( y.domain()[0] <= 0 ? y.domain()[1] >= 0 ? 0 : y.domain()[1] : y.domain()[0] ) })
                //.y1(function(d,i) { return y0(0) }) //assuming 0 is within y domain.. may need to tweak this
                .apply(this, [d.values])
          });
      d3.transition(areaPaths3)
          .attr('d', function(d) {
            return d3.svg.area()
                .interpolate(interpolate)
                .defined(defined)
                .x(function(d,i) { return x0(getX(d,i)) })
                .y0(function(d,i) { return y0(getAreaY1(d,i, 1/3)) })
                .y1(function(d,i) { return y0( d.cl) })
                //.y1(function(d,i) { return y0(0) }) //assuming 0 is within y domain.. may need to tweak this
                .apply(this, [d.values])
          });

      d3.transition(areaPaths3)
         .style('fill', function(d,i) { 
         	return "#00FF00" 
         })
      d3.transition(areaPaths3)
         .style('fill-opacity', function(d,i) { 
         	return .15
         });
	*/
     //ucl, lcl, cl값 표시하는 텍스트
     /*
     var areaText = groups.selectAll('path.areaText')
          .data(function(d) { return isArea(d) ? [d] : [] }); 
     areaText.enter().append('text');
     
     d3.transition(areaText)
          .attr('x', function(d) {
            return availableWidth + 10;
          })
          .attr('y', function(d) {
          	if(d.values[0].id=='ucl'){
          		return y0(d.values[0].ucl);
          	}else if(d.values[0].id=='lcl'){
          		return y0(d.values[0].lcl);
          	}
            return 0;
          })
          .text(function(d){
          	if(d.values[0].id=='ucl'){
          		return d.key + " = " + d.values[0].ucl;
          	}else if(d.values[0].id=='lcl'){
          		return d.key + " = " + d.values[0].lcl;
          	}
          })
          .style('text-anchor', 'right')
          .style('stroke', "#000000");
          
      var areaCLText = groups.selectAll('path.areaText')
          .data(function(d) { return isArea(d) ? [d] : [] }); 
     areaCLText.enter().append('text');
     
     d3.transition(areaCLText)
          .attr('x', function(d) {
            return availableWidth + 10;
          })
          .attr('y', function(d) {
          	if(d.values[0].id=='ucl'){
          		return y0(d.values[0].cl);
          	}else if(d.values[0].id=='lcl'){
          		return y0(d.values[0].cl);
          	}
            return 0;
          })
          .text(function(d){
          	if(d.values[0].id=='ucl'){
          		return "CL = " + d.values[0].cl;
          	}else if(d.values[0].id=='lcl'){
          		return '';
          	}
          })
          .style('text-anchor', 'right')
          .style('stroke', "#000000");
     */

      var linePaths = groups.selectAll('path.nv-line')
          .data(function(d) { return [d.values] });
      linePaths.enter().append('path')
          .attr('class', 'nv-line')
          .attr('d',
            d3.svg.line()
              .interpolate(interpolate)
              .defined(defined)
              .x(function(d,i) { return x0(getX(d,i)) })
              .y(function(d,i) { return y0(getY(d,i)) })
          );
      d3.transition(groups.exit().selectAll('path.nv-line'))
          .attr('d',
            d3.svg.line()
              .interpolate(interpolate)
              .defined(defined)
              .x(function(d,i) { return x(getX(d,i)) })
              .y(function(d,i) { return y(getY(d,i)) })
          );
      d3.transition(linePaths)
          .attr('d',
            d3.svg.line()
              .interpolate(interpolate)
              .defined(defined)
              .x(function(d,i) { return x(getX(d,i)) })
              .y(function(d,i) { return y(getY(d,i)) })
          );



      //store old scales for use in transitions on update
      x0 = x.copy();
      y0 = y.copy();

    });

    return chart;
  }


  //============================================================
  // Expose Public Variables
  //------------------------------------------------------------

  chart.dispatch = scatter.dispatch;
  chart.scatter = scatter;

  d3.rebind(chart, scatter, 'id', 'interactive', 'size', 'xScale', 'yScale', 'zScale', 'xDomain', 'yDomain', 'sizeDomain', 'forceX', 'forceY', 'forceSize', 'clipVoronoi', 'clipRadius', 'padData');

  chart.margin = function(_) {
    if (!arguments.length) return margin;
    margin.top    = typeof _.top    != 'undefined' ? _.top    : margin.top;
    margin.right  = typeof _.right  != 'undefined' ? _.right  : margin.right;
    margin.bottom = typeof _.bottom != 'undefined' ? _.bottom : margin.bottom;
    margin.left   = typeof _.left   != 'undefined' ? _.left   : margin.left;
    return chart;
  };

  chart.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return chart;
  };

  chart.x = function(_) {
    if (!arguments.length) return getX;
    getX = _;
    scatter.x(_);
    return chart;
  };

  chart.y = function(_) {
    if (!arguments.length) return getY;
    getY = _;
    scatter.y(_);
    return chart;
  };

  chart.clipEdge = function(_) {
    if (!arguments.length) return clipEdge;
    clipEdge = _;
    return chart;
  };

  chart.color = function(_) {
    if (!arguments.length) return color;
    color = nv.utils.getColor(_);
    scatter.color(color);
    return chart;
  };

  chart.interpolate = function(_) {
    if (!arguments.length) return interpolate;
    interpolate = _;
    return chart;
  };

  chart.defined = function(_) {
    if (!arguments.length) return defined;
    defined = _;
    return chart;
  };

  chart.isArea = function(_) {
    if (!arguments.length) return isArea;
    isArea = d3.functor(_);
    return chart;
  };

  //============================================================


  return chart;
}