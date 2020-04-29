import React from 'react';
const MailDetail = ({dataDisplay = []}: {
  dataDisplay?: GmailData[];
}) => {

  return (
    <table className="gmail-body-contain">
      <tbody>
        {dataDisplay.map((item: GmailData, i: number)=> {
          return (
            <tr className="gmail-contain-item" key={i}>
              <td className="gmail-contain-from" > {item.from}</td>
              <td> <a href={item.link}>{item.subject}</a> </td>
              <td> {item.time}</td>
            </tr>);
        })}
      </tbody>
    </table>
  );
};

export default MailDetail;