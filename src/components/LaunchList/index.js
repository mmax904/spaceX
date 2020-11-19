import qs from 'query-string';
import { isEmpty, map, range } from 'lodash';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import './LaunchList.scss';

import { api } from '../../api';

import Head from '../Head';
import Filter from './Filter';
import Footer from './Footer';
import Loader from '../Loader';
import CardItem from './CardItem';

const LaunchList = ({history}) => {

    const q = useMemo(() => qs.parse(history.location.search), [history.location.search]);
    const [ data, setData ] = useState([])
    const [ loading, setLoading ] = useState(true)
    const [ filters, setFilters ] = useState({limit:100,...q})

    const filterArray = [
        {
            title:"Launch Year",
            data:range(2006,2021),
            filterKey:"launch_year",
        },
        {
            title:"Successful Launch",
            data:['True','False'],
            filterKey:"launch_success",
        },
        {
            title:"Successful Landing",
            data:['True','False'],
            filterKey:"land_success",
        }
    ]

    const getLaunchData = useCallback(async () => {
        setFilters({limit:100,...q});
        setLoading(true);
        try {
            const launchData = await api.launches.get(`?${new URLSearchParams(q)}`);
            setData(launchData);
        } catch (error) {
            console.log(error)
        }
        setLoading(false);
    }, [q, setData, setLoading])

    useEffect(() => {
        getLaunchData();
    }, [getLaunchData])

    const filterData = (key, value) => {
        const qO = {...filters,[key]:value}
        history.push({
            pathname: '',
            search: `?${new URLSearchParams(qO)}`
        })
    }

    return (
        <>
            <Head />
            <Loader loading={loading} />
            {
                !loading &&
                <React.Fragment>
                        <div className="content-wrapper">
                        <h1>SpaceX Launch Programs</h1>
                        <div className="content-container">
                            <div className="filter-container">
                                <h2>Filters</h2>
                                {
                                    map(filterArray, (filter,fdx) => {
                                        return(
                                            <Filter
                                                key={fdx}
                                                title={filter.title}
                                                data={filter.data}
                                                filterKey={filter.filterKey}
                                                onFilter={filterData}
                                                filterValue={filters[filter.filterKey]}
                                            />
                                        )
                                    })
                                }
                            </div>
                            {
                                !isEmpty(data) &&
                                <div className="card-container">
                                    {
                                        map(data,(items, idx)=>{
                                            return (
                                                <CardItem key={idx} item={items} />
                                            );
                                        })
                                    }
                                </div>
                            }
                            {
                                isEmpty(data) &&
                                <div className="card-container">
                                    <h1>No Data Found !!</h1>
                                </div>
                            }
                        </div>
                    </div>
                    <Footer />
                </React.Fragment>
            }
        </>
    )
};

export default LaunchList;
