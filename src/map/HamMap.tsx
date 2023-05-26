import React, { useState } from "react"
import Select from 'react-select'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import { type } from "os"

interface HamMapProps {
    UserInfo: UserInfo,
    CQInfo: CQInfo[]
}



function HamMap(props: HamMapProps) {

    const user = props.UserInfo

    return (
        <>
            <div>
                <MapContainer center={[user.pos.lat, user.pos.lon]} zoom={13} scrollWheelZoom={false} className="h-96">
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {props.CQInfo.map(CQInfo => (
                        <Marker position={[CQInfo.pos.lat, CQInfo.pos.lon]}>
                            <Popup>
                                Name: {CQInfo.name} <br /> Address: <br />{CQInfo.address1} <br /> {CQInfo.address2}
                            </Popup>
                        </Marker>
                    ))}
                    <Marker position={[user.pos.lat, user.pos.lon]}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>
        </>
    )
}

export default HamMap;