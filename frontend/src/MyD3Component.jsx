import React, { useRef, useEffect } from 'react';
/* Component that contains a D3 chart */

function MyD3Component (props) {
    /* The useRef Hook creates a variable that "holds on" to a value across rendering
       passes. In this case it will hold our component's SVG DOM element. It's
       initialized null and React will assign it later (see the return statement) */
    const d3Container = useRef(null);

    /* The useEffect Hook is for running side effects outside of React,
       for instance inserting elements into the DOM using D3 */
    useEffect(
        () => {
            if (props.data && d3Container.current) {

                // the container holding our D3 chart
                const svg = null;// d3.select(d3Container.current);

                // Bind D3 data
                const update = svg
                    .append('g')
                    .selectAll('rect')
                    .data(props.data);

                // Enter new D3 elements
                update.enter()
                    .append('rect')
                    .attr('x', (d, i) => i * 25)
                    .attr('y', (d)=> 100-(d*15))
                    .attr("fill", "steelblue")
                    .attr("width",20)
                    .attr("height",(d) => d*15);

                // Update existing D3 elements
                update
                    .attr('x', (d, i) => i * 25)
                    .attr("height",(d) => d*15);

                // Remove old D3 elements
                update.exit()
                    .remove();
            }
        },

        /*
            useEffect has a dependency array (below). It's a list of dependency
            variables for this useEffect block. The block will run after mount
            and whenever any of these variables change. We still have to check
            if the variables are valid, but we do not have to compare old props
            to next props to decide whether to rerender.
        */
        [props.data, d3Container.current])

    return (
        <svg
            className="d3-component"
            width={400}
            height={200}
            ref={d3Container}
        />
    );
}

export default MyD3Component;