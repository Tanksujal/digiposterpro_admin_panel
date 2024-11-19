
import "../App.css";

const Header = () => {
  return (
    <header className="header">
      <h1>Welcome to the Admin Panel</h1>
      <div className="profile">
        <img
          src="https://via.placeholder.com/40"
          alt="Profile"
          className="profile-img"
        />
        <span>Admin</span>
      </div>
    </header>
  );
};

export default Header;
