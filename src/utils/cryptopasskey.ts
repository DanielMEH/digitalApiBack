import bcrypt from "bcrypt";
class encriptePassword {
    public async encriptePassword(password: string): Promise<string>
    {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    }
    public async comparePassword(password: string, savedPassword: string): Promise<boolean>
    {
        console.log(password, savedPassword)
        return await bcrypt.compare(password, savedPassword);
    } 
}

export const encripte = new encriptePassword();