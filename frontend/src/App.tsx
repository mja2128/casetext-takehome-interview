import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Typography from "@mui/material/Typography";

import atmSign from './assets/atm_sign.png';
import graffiti from './assets/graffiti.png';
import star from './assets/star.png';
import starSelected from './assets/star_selected.png';
import pulse from './assets/pulse.png';
import pulseSelected from './assets/pulse_selected.png';
import maestro from './assets/maestro.png';
import maestroSelected from './assets/maestro_selected.png';
import mastercard from './assets/mastercard.png';
import mastercardSelected from './assets/mastercard_selected.png';
import plus from './assets/plus.png';
import plusSelected from './assets/plus_selected.png';
import visa from './assets/visa.png';
import visaSelected from './assets/visa_selected.png';
import systems from './assets/systems.png';
import stickerGraffiti from './assets/sticker_graf.png';

const API_URL = 'http://localhost:5001';

async function withdrawOrDeposit(withdraw: boolean, pin: string) {
    const actionString = withdraw ? 'withdraw' : 'deposit';
    const amount = window.prompt(`How much would you like to ${actionString}?`);
    if (!amount || Number.isNaN(parseFloat(amount))) {
        window.alert('Please enter a number.');
    } else {
        const request = new Request(`${API_URL}/${actionString}`, {
            method: 'POST',
            body: `{ "pin": "${pin}", "amount": ${amount} }`,
            headers: { 'Content-Type': 'application/json' }
        });
        const response = await fetch(request);
        if (response.status === 200) {
            const responseBody = await response.json();
            window.alert(`Your new balance is: ${responseBody.balance}`);
        } else {
            window.alert(`I'm sorry Dave. I'm afraid I can't do that...`);
        }
    }
}

export default function App() {
    const [pin, setPin] = useState<string | null>(null);
    const [name, setName] = useState<string | null>(null);
    const [cardType, setCardType] = useState<string | null>(null);

  return (
    <Container maxWidth="sm" className="mt-12">
        <div className="mx-auto py-4 rounded-xl relative top-0 left-0 w-3/4" style={{ backgroundColor: `rgb(50, 106, 169)` }}>
            <img src={atmSign} alt="ATM sign" className="block mx-auto relative top-0 left-0" />
            <img src={graffiti} alt ="graffiti" className="absolute top-8 left-48" />
        </div>
        <Container className="bg-white w-4/6 px-0 h-screen">
            <div className="h-2 w-full bg-gray-400 mb-4" />

            <div>
                {/* card type logos */}
                {cardType === 'star' ? (<img className="h-6 ml-7 inline-block" src={starSelected} alt={`star logo`} />) :
                    (<img className="h-6 ml-7 inline-block" src={star} alt={`star logo`} />)}
                {cardType === 'pulse' ? (<img className="h-6" src={pulseSelected} alt={`pulse logo`} />) :
                    (<img className="h-6" src={pulse} alt={`pulse logo`} />)}
                {cardType === 'maestro' ? (<img className="h-6" src={maestroSelected} alt={`maestro logo`} />) :
                    (<img className="h-6" src={maestro} alt={`maestro logo`} />)}
                {cardType === 'mastercard' ? (<img className="h-6" src={mastercardSelected} alt={`mastercard logo`} />) :
                    (<img className="h-6" src={mastercard} alt={`mastercard logo`} />)}
                {cardType === 'plus' ? (<img className="h-6" src={plusSelected} alt={`plus logo`} />) :
                    (<img className="h-6" src={plus} alt={`plus logo`} />)}
                {cardType === 'visa' ? (<img className="h-6" src={visaSelected} alt={`visa logo`} />) :
                    (<img className="h-6" src={visa} alt={`visa logo`} />)}
            </div>

            <div>
                <div className="inline-block mx-1 relative top-1 left-0">
                    <button className="block mt-4 bg-gray-400 h-6 w-12 rounded" />
                    <button className="block mt-4 bg-gray-400 h-6 w-12 rounded" />
                    <button className="block mt-4 bg-gray-400 h-6 w-12 rounded" onClick={async () => {
                        if (pin) {
                            await withdrawOrDeposit(true, pin);
                        }
                    }} />
                    <button className="block mt-4 bg-gray-400 h-6 w-12 rounded" onClick={async () => {
                        if (pin) {
                            await withdrawOrDeposit(false, pin);
                        }
                    }} />
                    <img className="absolute top-38 left-6" src={stickerGraffiti} alt="sticker and graffiti" />
                </div>
                <div className="inline-block bg-sky-500 border-solid border-8 border-gray-300 w-4/6 mx-auto">
                    {name === null ? (
                        <>
                            <Typography variant="h3" textAlign="center" fontFamily="Pixeboy" color="white" mb={16}>Welcome to
                            the ATM</Typography>
                            <Typography textAlign="end" fontFamily="Pixeboy" color="white">Enter PIN --</Typography>
                        </>)
                    : (<>
                            <Typography variant="h5" textAlign="center" fontFamily="Pixeboy" color="white" mt={4}>Hi {name}!</Typography>
                            <Typography textAlign="center" fontFamily="Pixeboy" color="white" mb={4}>Please make a choice...</Typography>
                            <Typography textAlign="end" fontFamily="Pixeboy" color="white" mb={1}>Exit --</Typography>
                            <div className="mb-3">
                                <Typography textAlign="start" fontFamily="Pixeboy" color="white" mr={0.75} display="inline-block">-- Withdraw</Typography>
                                <Typography textAlign="end" fontFamily="Pixeboy" color="white" ml={9} display="inline-block">Balance --</Typography>
                            </div>
                            <div className="mb-2">
                                <Typography textAlign="start" fontFamily="Pixeboy" color="white" mr={0.5} display="inline-block">-- Deposit</Typography>
                                <Typography textAlign="end" fontFamily="Pixeboy" color="white" ml={6} display="inline-block">Re-Enter PIN --</Typography>
                            </div>
                        </>)}
                </div>
                <div className="inline-block mx-1 relative top-1">
                    <button className="block mt-4 bg-gray-400 h-6 w-12 rounded" />
                    <button className="block mt-4 bg-gray-400 h-6 w-12 rounded" onClick={() => {
                        setName(null);
                        setCardType(null);
                    }} />
                    <button className="block mt-4 bg-gray-400 h-6 w-12 rounded" onClick={async () => {
                        const request = new Request(`${API_URL}/balance?pin=${pin}`, { method: 'GET' });
                        const response = await fetch(request);
                        if (response.status === 200) {
                            const responseBody = await response.json();
                            window.alert(`Your balance is: ${responseBody.balance}`);
                        } else {
                            window.alert(`I'm sorry Dave. I'm afraid I can't do that...`);
                        }
                    }} />
                    <button className="block mt-4 bg-gray-400 h-6 w-12 rounded" onClick={async () => {
                        const pin = window.prompt('Please enter your PIN');
                        const request = new Request(`${API_URL}/submit-pin`, { method: 'POST', body: `{ "pin": "${pin}" }`, headers: { 'Content-Type': 'application/json' }});
                        const response = await fetch(request);
                        if (response.status === 404) {
                            window.alert('No account found with this PIN');
                            setName(null);
                            setCardType(null);
                        } else {
                            const responseBody = await response.json();
                            setPin(pin);
                            setName(responseBody.name);
                            setCardType(responseBody.cardType);
                        }
                    }} />
                </div>
            </div>
            <img className="block ml-60 mt-1" src={systems} alt="systems" />

        </Container>
    </Container>
  );
}
