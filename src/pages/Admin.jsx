import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { LogIn, LogOut, Trash2, CheckCircle, Clock, XCircle, BarChart2, Users, Calendar, IndianRupee } from 'lucide-react'

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'change_me_in_vercel'

const STATUS_STYLES = {
  Confirmed: 'text-green-400 bg-green-400/10 border-green-400/20',
  Pending: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
  Cancelled: 'text-red-400 bg-red-400/10 border-red-400/20',
  Completed: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
}

const STATUS_ICON = {
  Confirmed: <CheckCircle size={11} />,
  Pending: <Clock size={11} />,
  Cancelled: <XCircle size={11} />,
  Completed: <CheckCircle size={11} />,
}

export default function Admin() {
  const { bookings, updateBookingStatus } = useApp()
  const [authed, setAuthed] = useState(false)
  const [pw, setPw] = useState('')
  const [pwError, setPwError] = useState(false)
  const [filter, setFilter] = useState('All')

  const handleLogin = (e) => {
    e.preventDefault()
    if (pw === ADMIN_PASSWORD) { setAuthed(true); setPwError(false) }
    else { setPwError(true); setPw('') }
  }

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="font-bebas text-3xl tracking-[4px] text-gold mb-1">JEEVA</div>
            <div className="font-bebas text-sm tracking-[6px] text-cream/30 mb-6">ADMIN PANEL</div>
            <div className="w-12 h-12 bg-gold/10 border border-gold/20 rounded-full flex items-center justify-center mx-auto">
              <LogIn size={20} className="text-gold" />
            </div>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[11px] tracking-[2px] uppercase text-cream/40 mb-2">Admin Password</label>
              <input
                type="password"
                value={pw}
                onChange={e => setPw(e.target.value)}
                placeholder="Enter password"
                className={`w-full bg-black-card border px-4 py-3 text-sm text-cream focus:outline-none focus:border-gold transition-colors placeholder:text-cream/20 ${
                  pwError ? 'border-red-500' : 'border-black-border'
                }`}
              />
              {pwError && <p className="text-red-400 text-xs mt-2">Incorrect password. Try again.</p>}
            </div>
            <button type="submit" className="w-full bg-gold text-black py-3 text-xs tracking-[3px] uppercase font-semibold hover:bg-gold-light transition-colors">
              Login
            </button>
          </form>
          <p className="text-center text-[11px] text-cream/20 mt-6">Set via VITE_ADMIN_PASSWORD in Vercel environment variables</p>
        </div>
      </div>
    )
  }

  // Stats
  const totalRevenue = bookings.filter(b => b.status !== 'Cancelled').reduce((s, b) => s + b.total, 0)
  const confirmed = bookings.filter(b => b.status === 'Confirmed').length
  const todayStr = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
  const todayBookings = bookings.filter(b => b.date.includes(todayStr.split(' ')[0]))

  const statuses = ['All', 'Confirmed', 'Pending', 'Completed', 'Cancelled']
  const filtered = filter === 'All' ? bookings : bookings.filter(b => b.status === filter)

  return (
    <div className="min-h-screen pt-24 pb-20 bg-black">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="text-[11px] tracking-[5px] uppercase text-gold mb-1">Admin Panel</div>
            <h1 className="font-playfair text-4xl font-bold">Dashboard</h1>
          </div>
          <button onClick={() => setAuthed(false)}
            className="flex items-center gap-2 border border-black-border text-cream/50 px-4 py-2 text-xs tracking-[2px] uppercase hover:border-gold/40 hover:text-gold transition-colors">
            <LogOut size={13} /> Logout
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-[2px] mb-8">
          {[
            { icon: <Calendar size={16} className="text-gold" />, label: 'Total Bookings', value: bookings.length },
            { icon: <CheckCircle size={16} className="text-gold" />, label: 'Confirmed', value: confirmed },
            { icon: <Users size={16} className="text-gold" />, label: "Today's Slots", value: todayBookings.length },
            { icon: <IndianRupee size={16} className="text-gold" />, label: 'Total Revenue', value: `₹${totalRevenue.toLocaleString('en-IN')}` },
          ].map(({ icon, label, value }) => (
            <div key={label} className="bg-black-card border border-black-border p-6">
              <div className="flex items-center gap-2 mb-3 text-cream/40">
                {icon}
                <span className="text-[10px] tracking-[2px] uppercase">{label}</span>
              </div>
              <div className="font-bebas text-4xl text-gold">{value}</div>
            </div>
          ))}
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {statuses.map(s => (
            <button key={s} onClick={() => setFilter(s)}
              className={`px-4 py-1.5 text-xs tracking-[1px] uppercase border transition-colors ${
                filter === s ? 'bg-gold text-black border-gold' : 'border-black-border text-cream/50 hover:border-gold/40'
              }`}>
              {s} {s !== 'All' && `(${bookings.filter(b => b.status === s).length})`}
            </button>
          ))}
        </div>

        {/* Bookings table */}
        {filtered.length === 0 ? (
          <div className="bg-black-card border border-black-border p-16 text-center">
            <BarChart2 size={40} className="text-cream/10 mx-auto mb-4" />
            <p className="text-cream/30 text-sm">No bookings yet. Share your booking link to get started!</p>
          </div>
        ) : (
          <div className="bg-black-card border border-black-border overflow-x-auto">
            <table className="w-full admin-table">
              <thead>
                <tr className="border-b border-black-border bg-black/40">
                  <th>ID</th>
                  <th>Customer</th>
                  <th>Services</th>
                  <th>Barber</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(b => (
                  <tr key={b.id} className="hover:bg-black/20 transition-colors">
                    <td className="text-gold font-bebas text-base">#{b.id.toString().slice(-6)}</td>
                    <td>
                      <div className="font-medium text-sm">{b.customer.name}</div>
                      <div className="text-cream/40 text-xs">{b.customer.phone}</div>
                    </td>
                    <td>
                      <div className="flex flex-wrap gap-1">
                        {b.services.map((s, i) => (
                          <span key={i} className="text-[10px] bg-black border border-black-border px-2 py-0.5 text-cream/60 whitespace-nowrap">{s}</span>
                        ))}
                      </div>
                    </td>
                    <td className="text-sm text-cream/70">{b.barber}</td>
                    <td className="text-sm text-cream/70 whitespace-nowrap">{b.date}</td>
                    <td className="text-gold font-bebas text-base whitespace-nowrap">{b.time}</td>
                    <td className="font-bebas text-xl text-gold whitespace-nowrap">₹{b.total}</td>
                    <td>
                      <span className={`inline-flex items-center gap-1 text-[10px] tracking-[1px] uppercase px-2 py-1 border ${STATUS_STYLES[b.status] || STATUS_STYLES.Pending}`}>
                        {STATUS_ICON[b.status]} {b.status}
                      </span>
                    </td>
                    <td>
                      <select
                        value={b.status}
                        onChange={e => updateBookingStatus(b.id, e.target.value)}
                        className="bg-black border border-black-border text-cream/60 text-xs px-2 py-1.5 focus:outline-none focus:border-gold cursor-pointer"
                      >
                        {['Confirmed', 'Pending', 'Completed', 'Cancelled'].map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {bookings.length > 0 && (
          <div className="mt-4 text-right text-xs text-cream/30">
            Showing {filtered.length} of {bookings.length} bookings
          </div>
        )}
      </div>
    </div>
  )
}
