import { useState } from "react";
import {
  IconDatabase,
  IconX,
  IconUsers,
  IconCreditCard,
  IconCheckCircle,
} from "./Icons";
import { dbService, POSTGRESQL_DDL_SCHEMA } from "../services/db";

/**
 * ====================================================================
 * KOMPONEN INSPEKTOR DATABASE POSTGRESQL (Tabel Relasional & Skema SQL)
 * ====================================================================
 * Fitur untuk melihat langsung data di dalam tabel PostgreSQL simulasi:
 * 1. Tabel users
 * 2. Tabel bookings
 * 3. Skema resmi DDL PostgreSQL (.sql)
 */
export default function DatabaseModal({ onClose, onDatabaseChanged }) {
  const [activeTab, setActiveTab] = useState("bookings"); // 'bookings' | 'users' | 'schema'
  const [usersList, setUsersList] = useState(() => dbService.getAllUsers());
  const [bookingsList, setBookingsList] = useState(() => dbService.getBookings());
  const [copied, setCopied] = useState(false);

  function handleReset() {
    if (window.confirm("Apakah Anda ingin mereset database ke data awal?")) {
      dbService.resetDatabase();
      setUsersList(dbService.getAllUsers());
      setBookingsList(dbService.getBookings());
      if (onDatabaseChanged) onDatabaseChanged();
    }
  }

  function handleCopySql() {
    navigator.clipboard.writeText(POSTGRESQL_DDL_SCHEMA);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  function formatIDR(amount) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(amount);
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card db-inspector-card" onClick={(e) => e.stopPropagation()}>
        {/* Header Modal */}
        <div className="modal-header">
          <div className="modal-title-box">
            <div className="db-title-row">
              <IconDatabase size={22} color="#0284c7" />
              <h3>Database Inspector (PostgreSQL Schema Engine)</h3>
            </div>
            <p className="db-subtitle-text">
              Data relasional tersimpan aman secara persisten di LocalStorage dengan struktur tabel SQL resmi.
            </p>
          </div>
          <button type="button" className="btn-close-modal" onClick={onClose} aria-label="Tutup">
            <IconX size={20} color="#0f172a" />
          </button>
        </div>

        {/* Tab Navigasi Database */}
        <div className="db-tabs-bar">
          <button
            type="button"
            className={`db-tab-btn ${activeTab === "bookings" ? "active" : ""}`}
            onClick={() => setActiveTab("bookings")}
          >
            <IconCreditCard size={16} />
            <span>Tabel Bookings ({bookingsList.length})</span>
          </button>

          <button
            type="button"
            className={`db-tab-btn ${activeTab === "users" ? "active" : ""}`}
            onClick={() => setActiveTab("users")}
          >
            <IconUsers size={16} />
            <span>Tabel Users ({usersList.length})</span>
          </button>

          <button
            type="button"
            className={`db-tab-btn ${activeTab === "schema" ? "active" : ""}`}
            onClick={() => setActiveTab("schema")}
          >
            <IconDatabase size={16} />
            <span>Skema DDL PostgreSQL (schema.sql)</span>
          </button>
        </div>

        {/* Konten Database */}
        <div className="modal-body-content db-body-scroll">
          {/* 1. TABEL BOOKINGS */}
          {activeTab === "bookings" && (
            <div className="db-table-wrapper">
              {bookingsList.length === 0 ? (
                <div className="db-empty-state">
                  <p>Belum ada transaksi pemesanan di database. Coba lakukan booking paket tur!</p>
                </div>
              ) : (
                <table className="pg-table">
                  <thead>
                    <tr>
                      <th>Kode Booking</th>
                      <th>Pemesan</th>
                      <th>Paket Wisata</th>
                      <th>Tgl Berangkat</th>
                      <th>Peserta</th>
                      <th>Total Biaya</th>
                      <th>Metode Bayar</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookingsList.map((bk) => (
                      <tr key={bk.id}>
                        <td>
                          <code className="code-pill-blue">{bk.booking_code}</code>
                        </td>
                        <td>
                          <strong>{bk.customer_name}</strong>
                          <div className="sub-cell-text">{bk.customer_email}</div>
                        </td>
                        <td>{bk.package_title}</td>
                        <td>{bk.travel_date}</td>
                        <td>{bk.total_guests} Pax</td>
                        <td>
                          <strong>{formatIDR(bk.total_amount)}</strong>
                        </td>
                        <td>{bk.payment_method}</td>
                        <td>
                          <span className="badge-paid-tag">
                            <IconCheckCircle size={13} color="#10b981" />
                            {bk.payment_status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {/* 2. TABEL USERS */}
          {activeTab === "users" && (
            <div className="db-table-wrapper">
              <table className="pg-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nama Lengkap</th>
                    <th>Email Pengguna</th>
                    <th>No. Telepon</th>
                    <th>Password (Simulasi Hash)</th>
                    <th>Role</th>
                  </tr>
                </thead>
                <tbody>
                  {usersList.map((u) => (
                    <tr key={u.id}>
                      <td>#{u.id}</td>
                      <td>
                        <strong>{u.full_name}</strong>
                      </td>
                      <td>{u.email}</td>
                      <td>{u.phone}</td>
                      <td>
                        <code className="code-pill-gray">{u.password_hash}</code>
                      </td>
                      <td>
                        <span className="role-pill">{u.role}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* 3. SKEMA DDL SQL POSTGRESQL */}
          {activeTab === "schema" && (
            <div className="schema-sql-container">
              <div className="schema-header-row">
                <span>Skrip SQL PostgreSQL Resmi untuk Dijalankan di Supabase / pgAdmin:</span>
                <button
                  type="button"
                  className="btn-copy-sql"
                  onClick={handleCopySql}
                >
                  {copied ? "Tersalin ke Clipboard!" : "Salin Skrip SQL"}
                </button>
              </div>
              <pre className="sql-code-block">
                <code>{POSTGRESQL_DDL_SCHEMA}</code>
              </pre>
            </div>
          )}
        </div>

        {/* Footer Modal */}
        <div className="modal-actions-bar db-footer-bar">
          <button
            type="button"
            className="btn-modal-cancel"
            onClick={handleReset}
          >
            Reset ke Data Awal
          </button>
          <button
            type="button"
            className="btn-modal-proceed"
            onClick={onClose}
          >
            Tutup Inspektor
          </button>
        </div>
      </div>
    </div>
  );
}
