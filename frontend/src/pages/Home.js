import Navbar from '../components/Navbar';
import TrailerList from '../components/TrailerList';
import '../styles/Home.css';

export default function Home() {
  return (
    <div className="home-container">
      <Navbar />
      <main>
        <TrailerList />
      </main>
    </div>
  );
}