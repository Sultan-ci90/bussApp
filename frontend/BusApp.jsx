import React, { useState, useEffect } from 'react';

// Import objek 'actor' yang secara otomatis dibuat oleh dfx
import { bus_backend } from '../../../declarations/bus_backend';

const BusApp = () => {
    const [penumpang, setPenumpang] = useState([]);
    const [namaInput, setNamaInput] = useState('');
    const [statusMessage, setStatusMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    // Fungsi untuk mengambil data dari backend saat aplikasi dimuat
    const fetchPenumpang = async () => {
        try {
            const data = await bus_backend.getPenumpang();
            setPenumpang(data);
        } catch (error) {
            setStatusMessage('Gagal memuat data dari bus.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPenumpang();
    }, []);

    const tambahPenumpang = async () => {
        const nama = namaInput.trim();
        if (!nama) {
            setStatusMessage('Nama tidak boleh kosong.');
            return;
        }

        try {
            const updatedList = await bus_backend.tambahPenumpang(nama);
            setPenumpang(updatedList);
            setStatusMessage(`"${nama}" berhasil ditambahkan.`);
            setNamaInput('');
        } catch (error) {
            setStatusMessage('Gagal menambahkan penumpang.');
        }
    };

    const hapusPenumpang = async (nama) => {
        try {
            const updatedList = await bus_backend.hapusPenumpang(nama);
            setPenumpang(updatedList);
            setStatusMessage(`"${nama}" berhasil dihapus.`);
        } catch (error) {
            setStatusMessage('Gagal menghapus penumpang.');
        }
    };

    const handleAddSubmit = (e) => {
        e.preventDefault();
        tambahPenumpang();
    };

    if (isLoading) {
        return <div style={containerStyle}>Memuat data...</div>;
    }

    return (
        <div style={containerStyle}>
            <h1>Manajemen Bus</h1>
            <p style={{ color: 'green', fontStyle: 'italic' }}>{statusMessage}</p>

            <form onSubmit={handleAddSubmit} style={formStyle}>
                <input
                    type="text"
                    value={namaInput}
                    onChange={(e) => setNamaInput(e.target.value)}
                    placeholder="Masukkan nama penumpang"
                    style={inputStyle}
                />
                <button type="submit" style={buttonStyle}>
                    Tambah
                </button>
            </form>

            <div style={listContainerStyle}>
                <h2>Daftar Penumpang & Kursi Bus</h2>
                <ul style={listStyle}>
                    {penumpang.map((nama, index) => (
                        <li key={index} style={listItemStyle}>
                            <span style={seatLabelStyle}>Kursi {index + 1}:</span>
                            <span style={nama ? filledSeatStyle : emptySeatStyle}>
                                {nama || "Kosong"}
                            </span>
                            {nama && (
                                <button onClick={() => hapusPenumpang(nama)} style={removeButtonStyle}>
                                    Hapus
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

// Style CSS
const containerStyle = { padding: '20px', maxWidth: '600px', margin: '0 auto', fontFamily: 'sans-serif', border: '1px solid #ccc', borderRadius: '8px' };
const formStyle = { marginBottom: '20px', display: 'flex', gap: '10px' };
const inputStyle = { flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #ddd' };
const buttonStyle = { padding: '8px 16px', borderRadius: '4px', border: 'none', background: '#4CAF50', color: 'white', cursor: 'pointer' };
const listContainerStyle = { borderTop: '1px solid #eee', paddingTop: '20px' };
const listStyle = { listStyleType: 'none', padding: '0' };
const listItemStyle = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px', background: '#f9f9f9', borderBottom: '1px solid #eee' };
const seatLabelStyle = { fontWeight: 'bold', width: '80px' };
const filledSeatStyle = { flex: 1, marginLeft: '10px', color: 'black' };
const emptySeatStyle = { flex: 1, marginLeft: '10px', fontStyle: 'italic', color: '#aaa' };
const removeButtonStyle = { padding: '5px 10px', borderRadius: '4px', border: 'none', background: '#f44336', color: 'white', cursor: 'pointer' };

export default BusApp;