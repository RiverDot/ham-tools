use std::error::Error;
use serde::{Serialize, Deserialize};

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Response {
    pub status: String,
    #[serde(rename = "type")]
    pub type_field: String,
    pub current: Current,
    pub previous: Previous,
    pub trustee: Trustee,
    pub name: String,
    pub address: Address,
    pub location: Location,
    pub other_info: OtherInfo,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Current {
    pub callsign: String,
    pub oper_class: String,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Previous {
    pub callsign: String,
    pub oper_class: String,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Trustee {
    pub callsign: String,
    pub name: String,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Address {
    pub line1: String,
    pub line2: String,
    pub attn: String,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Location {
    pub latitude: String,
    pub longitude: String,
    pub gridsquare: String,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct OtherInfo {
    pub grant_date: String,
    pub expiry_date: String,
    pub last_action_date: String,
    pub frn: String,
    pub uls_url: String,
}

#[tokio::main]
pub async fn get(call_sign: String) -> Result<Response, Box<dyn Error>> {
    let http_response = reqwest::get(format!("https://callook.info/{call_sign}/json")).await?;
    let response = http_response.json::<Response>().await?;
    Ok(response)
}
