import React from 'react';
import styles from './Candidature.module.scss';
import cookie from 'cookie';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Router from 'next/router';

const Candidature = ({ event, candidature, candidate, token }) => {
  const [form, setForm] = useState({
    job_id: candidature.job_id, 
    user_id: candidature.user_id, 
    hired: !candidature.hired
  });

  const handleCandidature = async () => {
    try {
      const req = await fetch(`http://localhost:3000/api/candidatures/${candidature.id}`, {
          method: 'PUT',
          headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(form)
      })
      Router.push(`employer_home/event/${event.id}`)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={styles.Candidature}>
      <Link href={`/users/${candidate.id}`}>
        <a>-> {candidate && `${candidate.first_name} ${candidate.last_name}`}</a>
      </Link>
      {candidature.hired===true && <p>déjà engagé</p>}
      {candidature.hired===false && <button onClick={handleCandidature}>engager</button>}
    </div>
  );
}

export default Candidature;