const { APP_NAME } = require("../config/envConfig");

const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <style>
        @media only screen and (max-width: 600px) {
            body {
                padding: 0;
                margin: 0;
                width: 100% !important;
            }

            table {
                width: 100% !important;
            }

            img {
                max-width: 100% !important;
                height: auto !important;
            }

            .content-cell {
                padding: 15px !important;
            }

            .button {
                width: 100% !important;
            }
        }
    </style>
</head>

<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">

    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px 0;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0"
                    style="background-color: #ffffff; border-radius: 5px; overflow: hidden; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                    <!-- Header -->
                    <tr>
                        <td class="content-cell" style="padding: 20px; background-color: #007bff; text-align: center;">
                            <svg style="display: block; margin: 0 auto; max-width: 100px;" xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
                                <path fill="currentColor"
                                    d="M37.645 26.477a2.55 2.55 0 0 0-2.554 2.553a2.55 2.55 0 1 0 5.104 0a2.55 2.55 0 0 0-2.55-2.553m-6.244-4.02a2.553 2.553 0 1 0 0 5.104a2.552 2.552 0 0 0 0-5.104m1.787-9.939a2.686 2.686 0 0 0-2.685 2.687a2.69 2.69 0 0 0 2.685 2.689a2.687 2.687 0 0 0 2.685-2.689c0-1.486-1.2-2.687-2.685-2.687" />
                                <path fill="currentColor"
                                    d="M55.536.564H8.751C4.167.564.437 4.294.437 8.88v46.779c0 4.586 3.729 8.318 8.314 8.318h46.785c4.584 0 8.314-3.731 8.314-8.318V8.88c0-4.586-3.729-8.316-8.314-8.316M28.283 52.766l-.01 3.869H19.12v-1.626c0-1.055-.205-1.751-1.039-2.536l-8.41-8.932a7.8 7.8 0 0 1-1.875-5.073V24.981a2.535 2.535 0 0 1 2.534-2.534a2.544 2.544 0 0 1 2.549 2.534v9.848c-1.347.614-2.161 1.859-2.161 3.213c0 .901.36 1.76 1.017 2.422l5.224 5.733c.243.301.566.769.728 1.29c.09.279.117.578.124.953h1.657c-.008-.525-.051-.982-.203-1.452c-.28-.903-.845-1.639-1.178-2.029l-5.147-5.513a2.024 2.024 0 0 1 1.542-3.338c.528 0 1.027.2 1.407.566l10.67 10.715c1.844 1.932 1.724 3.901 1.724 5.375zM16.524 23.714c0-8.624 7.02-15.644 15.645-15.644s15.643 7.021 15.643 15.644c0 8.629-7.019 15.646-15.643 15.646s-15.645-7.017-15.645-15.646m40.007 14.755a7.8 7.8 0 0 1-1.875 5.073l-8.41 8.932c-.835.784-1.039 1.481-1.039 2.536v1.626h-9.153l-.01-3.869c0-1.474-.12-3.443 1.724-5.375l10.671-10.715c.38-.366.879-.566 1.407-.566a2.024 2.024 0 0 1 1.543 3.338l-5.147 5.513c-.334.39-.898 1.127-1.178 2.029c-.152.47-.194.927-.203 1.452h1.657c.006-.375.034-.675.124-.953c.162-.521.485-.989.728-1.29l5.224-5.733a3.43 3.43 0 0 0 1.017-2.422c-.001-1.353-.814-2.599-2.161-3.213v-9.848a2.545 2.545 0 0 1 2.549-2.534a2.535 2.535 0 0 1 2.534 2.534v13.487z" />
                            </svg>
                        </td>
                    </tr>

                    <!-- Body -->
                    <tr>
                        <td class="content-cell" style="padding: 20px;">
                            <h1 style="color: #333; text-align: center; margin-top: 20px; font-size: 24px; line-height: 1.4;">
                                Verify Your Email</h1>

                            <p style="color: #555; text-align: center; font-size: 16px; line-height: 1.6;">
                                Thank you for signing up! Your verification code is:
                            </p>

                            <!-- Verification Code -->
                            <div style="text-align: center; margin: 30px 0;">
                                <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #007bff;">
                                    {verificationCode}
                                </span>
                            </div>

                            <p style="color: #555; font-size: 16px; line-height: 1.6; text-align: center;">
                                Enter this code on the verification page to complete your registration.
                                This code will expire in 15 minutes for security reasons.
                            </p>

                            <p style="color: #555; font-size: 16px; line-height: 1.6; text-align: center;">
                                If you didn’t create an account, you can safely ignore this email.
                            </p>

                            <p style="color: #555; font-size: 16px; line-height: 1.6; text-align: center; margin-top: 20px;">
                                Best regards,<br>{regardsText}
                            </p>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f9f9f9; padding: 20px; text-align: center; font-size: 12px; color: #888;">
                            <p>This is an automated message. Please do not reply to this email.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>

</body>

</html>
`;

const WELCOME_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Welcome to ${APP_NAME}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f7;
            margin: 0;
            padding: 0;
            color: #51545e;
        }

        table {
            width: 100%;
            background-color: #f4f4f7;
            margin: 0;
            padding: 0;
            border-collapse: collapse;
        }

        .email-container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        .email-header {
            background-color: #007bff;
            color: white;
            text-align: center;
            padding: 20px;
            border-radius: 8px 8px 0 0;
        }

        .email-body {
            padding: 30px;
        }

        h1 {
            font-size: 24px;
            margin: 0 0 20px 0;
        }

        p {
            font-size: 16px;
            line-height: 1.5;
            margin: 10px 0;
        }

        a {
            text-decoration: none;
            color: #007bff;
        }

        .cta-button {
            background-color: #007bff;
            color: white !important;
            padding: 12px 24px;
            font-size: 16px;
            border-radius: 5px;
            text-align: center;
            display: inline-block;
            margin: 20px 0;
            text-decoration: none;
        }

        .email-footer {
            text-align: center;
            font-size: 12px;
            color: #888;
            padding: 20px;
        }

        .email-footer p {
            margin: 5px 0;
        }
    </style>
</head>

<body>
    <table>
        <tr>
            <td>
                <div class="email-container">
                    <!-- Email Header -->
                    <div class="email-header">
                        <h1>Welcome to ${APP_NAME}</h1>
                    </div>

                    <!-- Email Body -->
                    <div class="email-body">
                        <p>Hi {name},</p>
                        <p>We’re excited to welcome you to <strong>${APP_NAME}</strong>! Thank you for joining us.</p>
                        <p>To help you get started, log in to your account and explore everything we’ve prepared for you.</p>
                        <p>Click the button below to begin:</p>
                        <p>
                            <a href="{loginLink}" class="cta-button">Get Started</a>
                        </p>
                        <p>If you need any assistance, feel free to contact us. We’re here to help!</p>
                        <p>Best regards,<br>{regardsText}</p>
                    </div>

                    <!-- Email Footer -->
                    <div class="email-footer">
                        <p>&copy; 2024 ${APP_NAME}, All rights reserved.</p>
                    </div>
                </div>
            </td>
        </tr>
    </table>
</body>

</html>

`;

const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Successful</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }

    .header {
      background: linear-gradient(to right, #007bff, #0056b3);
      padding: 20px;
      text-align: center;
      border-radius: 8px 8px 0 0;
    }

    .header h1 {
      color: white;
      margin: 0;
    }

    .body {
      background-color: #f9f9f9;
      padding: 20px;
      border-radius: 0 0 8px 8px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }

    .icon-container {
      text-align: center;
      margin: 30px 0;
    }

    .icon {
      background-color: #007bff;
      color: white;
      width: 50px;
      height: 50px;
      line-height: 50px;
      border-radius: 50%;
      display: inline-block;
      font-size: 30px;
    }

    ul {
      padding-left: 20px;
      margin: 10px 0;
    }

    ul li {
      margin-bottom: 10px;
    }

    .footer {
      text-align: center;
      margin-top: 20px;
      color: #888;
      font-size: 0.8em;
    }
  </style>
</head>

<body>
  <!-- Header -->
  <div class="header">
    <h1>Password Reset Successful</h1>
  </div>

  <!-- Body -->
  <div class="body">
    <p>Hello,</p>
    <p>We're writing to confirm that your password has been successfully reset.</p>
    <div class="icon-container">
      <div class="icon">✓</div>
    </div>
    <p>If you did not initiate this password reset, please contact our support team immediately.</p>
    <p>For security reasons, we recommend that you:</p>
    <ul>
      <li>Use a strong, unique password</li>
      <li>Avoid using the same password across multiple sites</li>
    </ul>
    <p>Thank you for helping us keep your account secure.</p>
    <p>Best regards,<br>{regardsText}</p>
  </div>

  <!-- Footer -->
  <div class="footer">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>

</html>
`;
const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }

    .header {
      background: linear-gradient(to right, #007bff, #0056b3);
      padding: 20px;
      text-align: center;
      border-radius: 8px 8px 0 0;
    }

    .header h1 {
      color: white;
      margin: 0;
    }

    .body {
      background-color: #f9f9f9;
      padding: 20px;
      border-radius: 0 0 8px 8px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }

    .button-container {
      text-align: center;
      margin: 30px 0;
    }

    .button {
      background-color: #007bff;
      color: white;
      padding: 12px 20px;
      text-decoration: none;
      border-radius: 5px;
      font-weight: bold;
      font-size: 16px;
    }

    .footer {
      text-align: center;
      margin-top: 20px;
      color: #888;
      font-size: 0.8em;
    }
  </style>
</head>

<body>
  <!-- Header -->
  <div class="header">
    <h1>Password Reset</h1>
  </div>

  <!-- Body -->
  <div class="body">
    <p>Hello,</p>
    <p>We received a request to reset your password. If you didn't make this request, please ignore this email.</p>
    <p>To reset your password, click the button below:</p>
    <div class="button-container">
      <a href="{resetURL}" class="button">Reset Password</a>
    </div>
    <p>This link will expire in 1 hour for security reasons.</p>
    <p>Best regards,<br>{regardsText}</p>
  </div>

  <!-- Footer -->
  <div class="footer">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>

</html>
`;

module.exports = {
  VERIFICATION_EMAIL_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
};
