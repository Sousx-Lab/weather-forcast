import React from "react";


export default function ForcastDateTime({ timeStamp, day }: { timeStamp: number, day: string }): JSX.Element {
  
  const dateOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: 'long',
    day: '2-digit',
  }
  return (
    <div className="text-center">
      <h4 className="card-title">Le {new Date(timeStamp * 1000).toLocaleDateString('fr-FR', dateOptions)}</h4>
      <p className="card-text text-center">
        <small> Prévision pour la {(day === 'n') ? ('nuit ') : (day === 'd') ? ('journée ') : ''}
        à {new Date(timeStamp * 1000).toLocaleTimeString('fr-Fr', { hour: '2-digit', minute: '2-digit' })}h
        </small>
        </p>
    </div>
  );
}