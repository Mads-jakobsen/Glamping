import { useEffect, useState } from 'react';
import styles from '../Trip/Trip.module.css';
import {Link} from 'react-router-dom'

const Trip = () => {
  const [stays, setStays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Hent alle stays
  useEffect(() => {
    const fetchStays = async () => {
      try {
        const response = await fetch('http://localhost:3042/stays');
        const data = await response.json();

        if (data.status === 'ok') {
          const uniqueStays = data.data.filter(
            (stay, index, self) =>
              index === self.findIndex((s) => s._id === stay._id)
          );
          setStays(uniqueStays);
        } else {
          setError(data.message || 'Fejl ved hentning af stays');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStays();
  }, []);

  if (loading) return <p>Indlæser trips...</p>;
  if (error) return <p>{error}</p>;

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

              <p>{stay.description}</p>
              <div>
                <p>
                  <strong>Antal personer:</strong> {stay.numberOfPersons}
                </p>
                <p>
                  <strong>Pris:</strong> {stay.price} DKK
                </p>
              </div>

              {stay.includes && stay.includes.length > 0 && (
                <div>
                  <strong>Includes:</strong>
                  <ul>
                    {stay.includes.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Trip;