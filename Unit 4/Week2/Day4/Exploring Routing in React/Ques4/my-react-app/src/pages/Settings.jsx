import { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';

export default function Settings() {
    const { user, updateUser } = useContext(UserContext);
    const [formData, setFormData] = useState({ name: user.name, email: user.email });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateUser(formData);
        alert('Profile updated!');
    };

    return (
        <div className="container">
            <h2>⚙️ Settings</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input name="name" value={formData.name} onChange={handleChange} />
                </label>
                <label>
                    Email:
                    <input name="email" value={formData.email} onChange={handleChange} />
                </label>
                <button type="submit">Update</button>
            </form>
        </div>
    );
}
