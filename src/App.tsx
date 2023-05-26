import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import HamMap from "./map/HamMap";

let UserData: UserInfo = {
  pos: { lat: 42.7370, lon: -84.4839 }
}

function App() {

  const [cqData, setcqData] = useState<CQInfo[]>([])
  const [cqCall, setCQCall] = useState("")

  async function getCallsign() {
    await invoke('get_callsign', { call_sign: cqCall })
      .then((callsignData: any) => setcqData(cqData.concat({
        name: callsignData.name,
        address1: callsignData.address.line1,
        address2: callsignData.address.line2,
        pos: { lat: callsignData.location.latitude, lon: callsignData.location.longitude }
      })))
  }

  return (
    <div className="flex flex-col justify-center text-center m-0 pt-[10vh]">
      <label className="m-3">
        CQ Add: <input className="w-24 text-black" value={cqCall} onChange={e => setCQCall(e.target.value)} placeholder="Call sign"/> 
        <button className="mx-3 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={getCallsign}>Add CQ To Map</button>
      </label>
      <HamMap CQInfo={cqData} UserInfo={UserData} />
    </div>
  );
}

export default App;
