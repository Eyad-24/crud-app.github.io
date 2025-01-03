import { useState , useEffect } from "react"

export default function ModalForm({isOpen , onClose , mode , OnSubmit , clientData}){ 
    const[name,setName] = useState('');
    const[email,setEmail] = useState('');
    const[job,setJob] = useState('');
    const[rate,setRate] = useState('');
    const[status,setStatus] = useState(false);

    // Handle the change of status
    const handleStatusChange = (e) => {
        setStatus(e.target.value === 'Active'); // Set status as boolean
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const clientData = {name, email, job, rate: Number(rate) , isactive: status}
            await OnSubmit(clientData)
            onClose();
        } catch (err) {SS
            console.error("Error adding client" , err);
        }
        onClose();
    }

    useEffect(() => {
        if (mode === 'edit' && clientData) {
            setName(clientData.name);
            setEmail(clientData.email);
            setJob(clientData.job);
            setRate(clientData.rate);
            setStatus(clientData.isActive); // Assuming isActive is a boolean
        } else {
            // Reset fields when adding a new client
            setName('');
            setEmail('');
            setJob('');
            setRate('');
            setStatus(false);
        }
    }, [mode, clientData]);

    return (
        <>
            <dialog id="my_modal_3" className="modal" open={isOpen} >
            <div className="modal-box">
                <h3 className="font-bold text-lg py-4">{mode === 'edit' ? 'Edit Client' : 'Client Details' }</h3>
                <form method="dialog" onSubmit={handleSubmit}>
                    
                <label className="input input-bordered my-2 flex items-center gap-2">
                    Name
                    <input type="text" className="grow" value={name} onChange={(e) => setName(e.target.value)} />
                </label>

                <label className="input input-bordered my-2 flex items-center gap-2">
                    Email
                    <input type="text" className="grow" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                
                <label className="input input-bordered my-2 flex items-center gap-2">
                    Job
                    <input type="text" className="grow" value={job} onChange={(e) => setJob(e.target.value)} />
                </label>

                <div className="flex mb-4 justify-between my-2">
                    <label className="input input-bordered mr-2 flex items-center gap-2">
                        rate
                        <input type="Number" className="grow" value={rate} onChange={(e) => setRate(e.target.value)} />
                    </label>
                    
                    <select value={status ? 'Active' : 'Inactive'} className="select select-bordered w-full ax-w-xs" onChange={handleStatusChange} >
                        <option>Inactive</option>
                        <option>Active</option>
                    </select>

                </div>

                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>✕</button>

                <button className="btn btn-success">{mode === 'edit' ? 'Save Changes' : 'Add Client' } </button>
                </form>
            </div>
            </dialog>
        </>
    )
}