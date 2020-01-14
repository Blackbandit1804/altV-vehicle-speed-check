import * as alt from 'alt';

const config = {
    shapes: [
        {
            pos: { x: 20.1758, y: -1869.6659, z: 22.3319 },
            maxSpeed: 30
        },
        {
            pos: { x: 266.3868, y: -1548.7517, z: 28.3304 },
            maxSpeed: 100
        },
        {
            pos: { x: 401.8945, y: -1474.0615, z: 28.3304 },
            maxSpeed: 50
        }
    ],
    radius: 10,
    height: 5
};

for (let s of config.shapes) {
    let newShape = new alt.ColshapeCylinder(s.pos.x, s.pos.y, s.pos.z, config.radius, config.height);
    newShape.shapeType = 'speedCheck';
    newShape.maxSpeed = s.maxSpeed;
}

alt.on('entityEnterColshape', handleEntityEnterColshape);
alt.onClient('speedCheck:getVehicleSpeed', handleSpeedCheckGetVehicleSpeed);

function handleEntityEnterColshape(colshape, entitiy) {
    if (entitiy instanceof alt.Vehicle) {
        if (colshape.shapeType === 'speedCheck' && entitiy.driver) {
            entitiy.driver.setMeta('lastSpeedCheck', colshape);
            alt.emitClient(entitiy.driver, 'speedCheck:getVehicleSpeed');
        }
    }
}

function handleSpeedCheckGetVehicleSpeed(player, speed) {
    let lastColshape = player.getMeta('lastSpeedCheck');
    if (lastColshape) {
        let maxSpeed = lastColshape.maxSpeed;
        if (speed > maxSpeed) {
            let diff = speed - maxSpeed;
            notifyPlayer(player, `${speed}/${maxSpeed} km/h; too much: ~r~${diff}`)
        }
        player.setMeta('lastSpeedCheck', null);
    }
}

function notifyPlayer(player, text) {
    alt.emitClient(player, 'speedCheck:notify', text);
}
