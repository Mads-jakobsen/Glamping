import { useEffect, useState } from 'react';
import styles from '../Trip/Trip.module.css';
import {Link} from 'react-router-dom'

// trip component

const Trip = () => {
  const [stays, setStays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // async  funktion Henter data
  
  useEffect(() => {
    const fetchStays = async () => {
      try {
        const response = await fetch('http://localhost:3042/stays');
        const data = await response.json(); // json data

//hvis ok forsæt kun unikke ider gemmes

        if (data.status === 'ok') {
          const uniqueStays = data.data.filter(
            (stay, index, self) =>
              index === self.findIndex((s) => s._id === stay._id)
          );
          setStays(uniqueStays); // gemmer id
        } else {
          setError(data.message || 'Fejl ved hentning af stays'); // fejl og besked
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStays(); // henter stay
  }, []);

  if (loading) return <p>Indlæser trips...</p>;
  if (error) return <p>{error}</p>;

  // mapper stay ser om billedesti har et  url ellers laver den en url

  return (
    <div>
      {stays.length === 0 && <p>Ingen trips at vise</p>}

      <div className={styles.tripGrid}>
        {stays.map((stay) => {
          const imagePath = stay.image.startsWith('http')
            ? stay.image
            : `http://localhost:3042/images/${stay.image.replace(/^(images\/)+/, '')}`;

          return (
            <div key={stay._id} className={styles.tripBox}>
              <div className={styles.imageWrapper}>
                <img className={styles.tripImage} src={imagePath} alt={stay.name} />
                <div className={styles.imageTopBox}>
                  {stay.title || stay.name}
                  <div>{stay.numberOfPersons} personer</div>
                  <div>Fra {stay.price}</div>
                </div>
              </div>

              <Link to={`/trip/${stay._id}`} className={styles.readMoreButton}>
  Læs mere
</Link>

            
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Trip;