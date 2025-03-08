import { NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey('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');

export async function POST(req) {
  const { email, bookingData , mzg } = await req.json();

  console.log("--------------------bookingData-------------------");
  console.log(bookingData);

  const msg = {
    to: email,
    from: 'djanithak@gmail.com', // Use your verified SendGrid email
    subject: 'Booking Confirmation',
    text: `You have placed new Booking. Booking details: ${JSON.stringify(bookingData)}`,
    html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2 style="color: #333;">Booking Confirmation</h2>
      <p>Your booking has been confirmed. Here are the details:</p>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <th style="text-align: left; padding: 8px; background-color: #f2f2f2;">Field</th>
          <th style="text-align: left; padding: 8px; background-color: #f2f2f2;">Details</th>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;">User ID</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${bookingData.userId}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;">Cab ID</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${bookingData.cabId}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;">Driver ID</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${bookingData.driverId}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;">Booking Time</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${bookingData.bookingTime}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;">Booking Date</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${new Date(bookingData.bookingDate).toLocaleDateString()}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;">Booking Status</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${bookingData.bookingStatus}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;">Note</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${bookingData.note}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;">Date</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${new Date(bookingData.date).toLocaleDateString()}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;">Start Destination</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${bookingData.startDestination}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;">End Destination</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${bookingData.endDestination}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;">Start Time</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${bookingData.startTime}</td>
        </tr>
      </table>
    </div>
  `,
  };

  try {
    await sgMail.send(msg);
    console.log("Email sent!");
    return NextResponse.json({ message: 'Email sent' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error sending email' }, { status: 500 });
  }
}


interface TestProp
{
  params: Promise<{ slug: string }>
}




export default async function Page({params,}: TestProp ) {
  const { slug } = await params
  return <div>My Post: {slug}</div>
}