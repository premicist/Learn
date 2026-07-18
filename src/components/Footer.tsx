function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        <p>&copy; {new Date().getFullYear()} EduSite &mdash; Economics learning resources.</p>
        <p className="footer__note">Class 11 & 12 &middot; Bachelor's &middot; Master's</p>
      </div>
    </footer>
  )
}

export default Footer
