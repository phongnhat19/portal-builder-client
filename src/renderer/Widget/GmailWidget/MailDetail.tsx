import React from 'react';
const MailDetail = ({gmailDataList = []}: {
  gmailDataList?: GmailData[];
}) => {

  return (
    <table className="gmail-body-contain">
      <tbody>
        {gmailDataList.map((gmail: GmailData, i: number)=> {
          return (
            <tr className="gmail-contain-item" key={i}>
              <td className="gmail-contain-from" > {gmail.from}</td>
              <td> <a href={gmail.link}>{gmail.subject}</a> </td>
              <td> {gmail.time}</td>
            </tr>);
        })}
      </tbody>
    </table>
  );
};

export default MailDetail;