import React from 'react';
import { head, join } from 'lodash';

const CardItem = ({item}) => {
    const getlandSuccess = (i) => {
        return head(i.rocket?.first_stage?.cores)?.land_success ? 'true' : 'false';
    }
    return(
        <div className="card-container-item">
            <div className="card-container-item-image">
                <img alt={item.mission_name} src={item.links.mission_patch_small} />
            </div>
            <div className="card-container-item-info">
                <h3>{`${item.mission_name} #${item.flight_number}`}</h3>
                <p><span>Mission Ids:</span>{join(item.mission_id,', ') || '-'}</p>
                <p><span>Launch Year:</span>{item.launch_year}</p>
                <p><span>Successful Launch:</span>{item.launch_success ? 'true' : 'false'}</p>
                <p><span>Successful Landing:</span>{getlandSuccess(item)}</p>
            </div>
        </div>
    )
};

export default CardItem;
