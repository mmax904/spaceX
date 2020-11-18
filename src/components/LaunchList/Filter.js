import React from 'react';
import { map, toLower } from 'lodash';
const Filter = (props) => {
    const filterData = (val) => {
        if(props.filterValue === toLower(val)) val = '';
        props.onFilter(props.filterKey,toLower(val))
    };
    
    return (
        <div className="filter-container-group">
            <h3>{props.title}</h3>
            <div className="filter-container-group-buttons">
                {
                    map(props.data,(item,idx) => {
                        return (
                            <button
                                key={idx} 
                                onClick={() => filterData(item)}
                                className={props.filterValue === toLower(item) ? 'active' : ''}
                            >
                                {item}
                            </button>
                        )
                    })
                }
            </div>
        </div>
    )
};

export default React.memo(Filter);
