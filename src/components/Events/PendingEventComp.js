import React, { Component } from 'react'
import EventComp from "./EventComp";

export default class PendingEventComp extends Component {

    render() {
        return (
            <div>
                <EventComp isPending={true} />
            </div>
        )
    }
}
