const express = require('express');
const router = express.Router();

const knex = require('../db/knex');

router.get('/', (req, res) => {
	knex('vessel')
		.select()
		.then(vessels => {
			res.render('all', { vessels : vessels });
		});
});

router.get('/new', (req, res) => {
	res.render('new');
});

router.post('/', (req, res) => {
	validateVesselInsertUpdateRedirect(req, res, (vessel) => {
		knex('vessel')
			.insert(vessel, 'mmsi')
			.then(mmsis => {
				const mmsi = mmsis[0];
				res.redirect(`/vesselcodes/${mmsi}`);
			});
	});
});


function respondAndRenderVessel(mmsi, res, viewName) {
	if (typeof mmsi != 'undefined') {
		knex('vessel')
			.select()
			.where('mmsi', mmsi)
			.first()
			.then(vessel => {
				res.render(viewName, vessel);
		});	
	} else {
		res.status(500);
		res.render('error', {
			message: 'Invalid mmsi'
		});
	}
}

function ValidVessel(vessel) {
	return typeof vessel.imo == 'string' &&
		vessel.imo.trim() != '' &&
		typeof vessel.mmsi == 'string' &&
		vessel.mmsi.trim() != '' &&
		typeof vessel.shipname == 'string' &&
		vessel.shipname.trim() != '';
}

function validateVesselInsertUpdateRedirect (req, res, callback) {
	if(ValidVessel(req.body)) {
		const vessel = {
			imo: req.body.imo,
			mmsi: req.body.mmsi,
			shipname: req.body.shipname,
			flag: req.body.flag,
			vtype: req.body.vtype,
			lat: req.body.lat,
			lng: req.body.lng
		};
		callback(vessel);
	} else {
		res.status(500);
		res.render('error', {
			message: "Invalid todo"
		});
	}
}


router.get('/:mmsi', (req, res) => {
	const mmsi = req.params.mmsi;
	respondAndRenderVessel(mmsi, res, 'single');	
});


router.get('/:mmsi/edit', (req,res) => {
	const mmsi = req.params.mmsi;
	respondAndRenderVessel(mmsi, res, 'edit');
});

router.get('/:mmsi/ggmap', (req,res) => {
	const mmsi = req.params.mmsi;
	respondAndRenderVessel(mmsi, res, 'geolocation');
});


router.put('/:mmsi', (req, res) => {
	// console.log(req.body);
	validateVesselInsertUpdateRedirect(req, res, (vessel) => {
		knex('vessel')
			.where('mmsi', req.params.mmsi)
			.update(vessel, 'mmsi')
			.then(mmsis => {
				const mmsi = mmsis[0];
				res.redirect(`/vesselcodes/${mmsi}`);
			});
		});
	});


router.delete('/:mmsi', (req, res) => {
	const mmsi = req.params.mmsi;
	if (typeof mmsi != 'undefined') {
		knex('vessel')
			.where('mmsi', mmsi)
			.del()
			.then(() => {
				res.redirect("/vesselcodes");
		});	
	} else {
		res.status(500);
		res.render('error', {
			message: 'Invalid mmsi delete'
		});
	}
});


module.exports = router;
