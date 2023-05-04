import { Auth } from 'src/auth/models/auth.model';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { InjectModel } from '@nestjs/sequelize';
import { jwtConstants } from 'src/auth/constants';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectModel(Auth)
    private readonly authModel: typeof Auth,
  ) { }


  async getUser(userData): Promise<any> {
    const userdata = await this.usersService.findOne(userData)
    if (userdata) {
      return userdata;
    }
    return null;
  }

  async verifyAuthToken(token: string) {
    try {
      const decoded = this.jwtService.verify(token);
      console.log("decoded", decoded);
      return decoded
      // the token is valid
    } catch (err) {
      return null
      // the token is invalid
    }
  }


  generateToken(user: any): string {
    const payload = {
      ...user
    };
    const token = this.jwtService.sign(payload, { secret: jwtConstants.secret });
    return token;
  }


  async sendResetPasswordEmail(email: string) {
    const token = this.generateRandomToken(10);
    await this.authModel.update({ token: token }, {
      where: {
        email,
      },
    },
    );
    // Save the token to the database with the user's email address
    // saveTokenToDatabase(email, token);

    // Send the email to the user's email address
    // const transporter = nodemailer.createTransport({
    //   service: 'gmail',
    //   auth: {
    //     user: "mukhtiarfsd@gmail.com",
    //     pass: "Hussain@786",
    //   },
    // });

    // const mailOptions = {
    //   to: email,
    //   subject: 'Reset Password',
    //   text: `Click the link to reset your password: http://localhost:3000/reset-password/${token}`,
    // };

    // await transporter.sendMail(mailOptions);
    return { token: token }
  }

  async verifyToken(token: string) {
    return await this.authModel.findOne({
      where: {
        token,
      },
    });
  }

  generateRandomToken(length) {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let token = '';

    for (let i = 0; i < length; i++) {
      token += chars[Math.floor(Math.random() * chars.length)];
    }

    return token;
  }

  updatePassword(email: string, password: any, token: any): Promise<any> {
    return this.authModel.update({
      password: password,
    },
      {
        where: {
          email,
          token
        },
      },
    );
  }
}
