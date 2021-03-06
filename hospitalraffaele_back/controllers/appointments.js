const Sequelize = require('sequelize');
const db = require('../models');
const availability = db.availability;

module.exports = {

    /**
     * Availability Appointment
     */
    create (req, res) {
        // Buscamos la disponibilidad deseada
        const disponibilidad = availability.findOne({
            where: {
                doctor_id: req.body.doctor,
                date: req.body.date,
                time: req.body.time
            }
        });

       return  Promise
            .all([disponibilidad])
            .then(result => {
                let turno = result[0];
                
                if(turno === null) {
                    // Chequeamos si la disponibilidad existe (si el medico trabaja en ese horario).
                    return res.status(201).send("No existe esta disponibilidad");

                } else if(turno.patient_id !== null) {
                    // Chequeamos si el turno ya esta ocupado.
                    return res.status(201).send("Turno OCUPADO");

                } else {
                    // Grabamos el turno con el id del paciente.
                    turno.update({
                        patient_id: req.body.patient
                    
                    })
                    .then(turno => res.status(200).send(turno))
                    .catch(error => res.status(400).send(error));
                }
                
            })
            .catch(error => res.status(400).send(error));
    },

    /**
     * Find an Appointment by Doctor
     */
    findByDoctor (req, res) {
        return availability
            .findAll({
                where: {
                    doctor_id: req.params.doctor,
                }
            })
            .then(availability => res.status(200).send(availability))
            .catch(error => res.status(400).send(error))
    },

    /**
     * Find an Appointment by Patient
     */
    findByPatient (req, res) {
        return availability
            .findAll({
                where: {
                    patient_id: req.params.patient,
                }
            })
            .then(availability => res.status(200).send(availability))
            .catch(error => res.status(400).send(error))
    },

    /**
     * Check if appoitment exists
     */
    appointmentExists (req, res) {
        return availability
            .findAll({
                where: {
                    doctor_id: req.params.doctor,
                    date: req.params.date,
                    time: req.params.time
                }
            })
            .then(availability => res.status(200).send(availability))
            .catch(error => res.status(400).send(error))
    }
}