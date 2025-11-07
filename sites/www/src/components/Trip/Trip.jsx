import { useEffect, useState, useRef } from 'react';
import styles from '../Trip/Trip.module.css'


const Trip = () => {
  const [stays, setStays] = useState([]);
  const [selectedStay, setSelectedStay] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const hasFetched = useRef(false);

  // Hent alle stays
  useEffect(() => {
    if (hasFetched.current) return;

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
    hasFetched.current = true;
  }, []);

  
  const fetchStayById = async (id) => {
    try {
      const response = await fetch(`http://localhost:3042/stay/${id}`);
      const data = await response.json();

      if (data.status === 'ok') {
        setSelectedStay(data.data);
      } else {
        setError(data.message || 'Fejl ved hentning af stay');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p >Indlæser trips...</p>;
  if (error) return <p >{error}</p>;

  return (
    <div >
    

      {stays.length === 0 && <p>Ingen trips at vise</p>}

      <div className={styles.tripGrid}>
        {stays.map((stay) => {
          const imagePath = stay.image.startsWith('http')
            ? stay.image
            : `http://localhost:3042/images/${stay.image.replace(/^(images\/)+/, '')}`;

          return (
      <div
        key={stay._id}
        onClick={() => fetchStayById(stay._id)}
      >
        
        <h3>{stay.title}</h3>

        
        <h2 >{stay.name}</h2>

      
        <img className={styles.tripImage} src={imagePath} alt={stay.name} />

        
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