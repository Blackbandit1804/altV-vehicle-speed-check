import * as alt from 'alt';
import * as native from 'natives';

alt.onServer('speedCheck:notify', handleSpeedCheckNotify);
alt.onServer('speedCheck:getVehicleSpeed', handleSpeedCheckGetVehicleSpeed);

function handleSpeedCheckGetVehicleSpeed() {
    let vehicle = alt.Player.local.vehicle;
    if (vehicle) {
        let speed = parseInt((native.getEntitySpeed(vehicle.scriptID) * 3.6).toFixed(0));
        if (speed) alt.emitServer('speedCheck:getVehicleSpeed', speed);
    }
}

function handleSpeedCheckNotify(text) {
    native.beginTextCommandThefeedPost('STRING');
    native.addTextComponentSubstringPlayerName(text);
    native.endTextCommandThefeedPostTicker(false, true);
}
