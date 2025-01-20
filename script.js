// Fungsi untuk mengambil data penyewaan
function ambilData() {
    axios
        .get("http://localhost:3000/penyewaan")
        .then((response) => {
            let wadah = "";
            let penyewaan = response.data;

            // Jika ada data, tampilkan dalam tabel
            if (penyewaan.length > 0) {
                penyewaan.forEach((item, index) => {
                    wadah += `
                        <tr>
                            <td>${index + 1}</td>
                            <td>${item.noKTP}</td>
                            <td>${item.nama}</td>
                            <td>${item.jenisKelamin}</td>
                            <td>${item.usia}</td>
                            <td>${item.jenisIphone}</td>
                            <td>${item.alamat}</td>
                            <td>${item.tanggalSewa}</td>
                            <td>${item.tanggalPengembalian}</td>
                            <td>
                                <button onclick="editData('${item.id}', '${item.noKTP}', '${item.nama}', '${item.jenisKelamin}', '${item.usia}', '${item.jenisIphone}', '${item.alamat}', '${item.tanggalSewa}', '${item.tanggalPengembalian}')">Edit</button>
                                <button onclick="hapusData('${item.id}')">Hapus</button>
                            </td>
                        </tr>
                    `;
                });
            } else {
                // Jika tidak ada data, tampilkan pesan
                wadah += `
                    <tr>
                        <td colspan="10">Data tidak ditemukan</td>
                    </tr>
                `;
            }

            document.getElementById("hasil").innerHTML = wadah;
        })
        .catch((error) => {
            // Jika terjadi kesalahan, tampilkan pesan error
            document.getElementById("hasil").innerHTML = `
                <tr>
                    <td colspan="10">Terjadi kesalahan: ${error.message}</td>
                </tr>
            `;
        });
}

// Fungsi untuk menyimpan data baru
function simpanData() {
    const data = {
        noKTP: document.getElementById("noKTP").value,
        nama: document.getElementById("namaLengkap").value,
        jenisKelamin: document.getElementById("jenisKelamin").value,
        usia: document.getElementById("usia").value,
        jenisIphone: document.getElementById("jenisIphone").value,
        alamat: document.getElementById("alamat").value,
        tanggalSewa: document.getElementById("tanggalSewa").value,
        tanggalPengembalian: document.getElementById("tanggalPengembalian").value,
    };

    // Validasi data
    if (Object.values(data).includes("")) {
        Swal.fire("Data belum lengkap!");
    } else {
        axios
            .post("http://localhost:3000/penyewaan", data)
            .then(() => {
                Swal.fire("Penyimpanan data sukses");
                ambilData();
                clearForm();
            })
            .catch((error) => Swal.fire(`Gagal menyimpan: ${error.message}`));
    }
}

// Fungsi untuk menampilkan data yang akan diedit
function editData(id, noKTP, nama, jenisKelamin, usia, jenisIphone, alamat, tanggalSewa, tanggalPengembalian) {
    document.getElementById("noKTP").value = noKTP;
    document.getElementById("namaLengkap").value = nama;
    document.getElementById("jenisKelamin").value = jenisKelamin;
    document.getElementById("usia").value = usia;
    document.getElementById("jenisIphone").value = jenisIphone;
    document.getElementById("alamat").value = alamat;
    document.getElementById("tanggalSewa").value = tanggalSewa;
    document.getElementById("tanggalPengembalian").value = tanggalPengembalian;

    document.getElementById("btnSimpan").innerText = "Update";
    document.getElementById("btnSimpan").setAttribute("onclick", `updateData('${id}')`);
}

// Fungsi untuk memperbarui data
function updateData(id) {
    const data = {
        noKTP: document.getElementById("noKTP").value,
        nama: document.getElementById("namaLengkap").value,
        jenisKelamin: document.getElementById("jenisKelamin").value,
        usia: document.getElementById("usia").value,
        jenisIphone: document.getElementById("jenisIphone").value,
        alamat: document.getElementById("alamat").value,
        tanggalSewa: document.getElementById("tanggalSewa").value,
        tanggalPengembalian: document.getElementById("tanggalPengembalian").value,
    };

    Swal.fire({
        title: "Ubah data?",
        showCancelButton: true,
        confirmButtonText: "OK",
    }).then((result) => {
        if (result.isConfirmed) {
            axios
                .patch(`http://localhost:3000/penyewaan/${id}`, data)
                .then(() => {
                    Swal.fire("Data berhasil diperbarui");
                    ambilData();
                    clearForm();
                    document.getElementById("btnSimpan").innerText = "Simpan";
                    document.getElementById("btnSimpan").setAttribute("onclick", "simpanData()");
                })
                .catch((error) => Swal.fire(`Gagal memperbarui: ${error.message}`));
        }
    });
}

// Fungsi untuk menghapus data
function hapusData(id) {
    Swal.fire({
        title: "Hapus data?",
        text: "Data yang telah dihapus tidak dapat dikembalikan",
        showCancelButton: true,
        confirmButtonText: "Ya",
        cancelButtonText: "Tidak",
    }).then((result) => {
        if (result.isConfirmed) {
            axios
                .delete(`http://localhost:3000/penyewaan/${id}`)
                .then(() => {
                    Swal.fire("Data berhasil dihapus");
                    ambilData();
                })
                .catch((error) => Swal.fire(`Gagal menghapus: ${error.message}`));
        }
    });
}

// Fungsi untuk membersihkan form
function clearForm() {
    document.getElementById("noKTP").value = "";
    document.getElementById("namaLengkap").value = "";
    document.getElementById("jenisKelamin").value = "";
    document.getElementById("usia").value = "";
    document.getElementById("jenisIphone").value = "";
    document.getElementById("alamat").value = "";
    document.getElementById("tanggalSewa").value = "";
    document.getElementById("tanggalPengembalian").value = "";
}

// Jalankan fungsi ambil data saat halaman dimuat
ambilData();
