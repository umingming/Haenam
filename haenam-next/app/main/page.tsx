"use client";

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!

export default function Main() {
    return (
        <div className="box" id="main">
            <header>
                <h1 id="logo">해냄</h1>
            </header>
            <div className="main-calendar">
                <FullCalendar
                    plugins={[ dayGridPlugin ]}
                    initialView="dayGridMonth"
                    dayMaxEvents={1}
                    events={[
                        { title: 'event 1', date: '2024-09-01' },
                        { title: 'event 10', date: '2024-09-08' },
                        { title: 'event 10', date: '2024-09-08' },
                        { title: 'event 10', date: '2024-09-15' },
                        { title: 'event 10', date: '2024-09-15' },
                        { title: 'event 10', date: '2024-09-01' },
                        { title: 'event 1', date: '2024-09-01' },
                    ]}
                />
            </div>
            <div className="main-list"></div>
        </div>
    );
}