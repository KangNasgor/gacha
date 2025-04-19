'use client'
export default function Auth(){
    async function sendEmail(){
        const res = await fetch('/api/send-auth',{
            method: 'POST',
            headers: { 'Content-Type' : 'application/json' },
        })

        const data = await res.json();
        console.log(data);
    }

    return(
        <div className="bg-texture-1 h-screen">
            <button onClick={sendEmail}>send email</button>
        </div>
    );
}