const navItems = [
  { id: 'proyectos', label: 'Proyectos', target: '#' },
  { id: 'nuevo', label: 'Nuevo proyecto', target: '#' },
]

export default function Nav() {
  return (
    <nav className="app-nav">
      {navItems.map((item) => (
        <a key={item.id} href={item.target} className="nav-button">
          {item.label}
        </a>
      ))}
    </nav>
  )
}
