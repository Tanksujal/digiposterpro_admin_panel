const Sidebar = () => {
  return (
    <div>
      <aside className="left-sidebar" data-sidebarbg="skin5">
        {/* Sidebar scroll*/}
        <div className="scroll-sidebar">
          {/* Sidebar navigation*/}
          <nav className="sidebar-nav">
            <ul id="sidebarnav" className="pt-4">
              <li className="sidebar-item">
                <a
                  className="sidebar-link waves-effect waves-dark sidebar-link"
                  href="/dashboard"
                  aria-expanded="false"
                >
                  <i className="mdi mdi-view-dashboard" />
                  <span className="hide-menu">Dashboard</span>
                </a>
              </li>
              <li className="sidebar-item">
                <a
                  className="sidebar-link has-arrow waves-effect waves-dark"
                  href="javascript:void(0)"
                  aria-expanded="false"
                >
                  <i className="mdi mdi-receipt" />
                  <span className="hide-menu">Tempaltes</span>
                </a>
                <ul aria-expanded="false" className="collapse first-level">
                  <li className="sidebar-item">
                    <a href="/view_templates" className="sidebar-link">
                      <i className="mdi mdi-note-outline" />
                      <span className="hide-menu">View Templates</span>
                    </a>
                  </li>
                </ul>
              </li>
              
            </ul>
          </nav>
          {/* End Sidebar navigation */}
        </div>
        {/* End Sidebar scroll*/}
      </aside>
    </div>
  );
};

export default Sidebar;
