import bcryptjs from 'bcryptjs'

const hashPassword = async (password) => {
    const pass = await bcryptjs.hash(password, 10);
    return pass;

}

const comparePassword = async (password, hash) => {
    const samePassword = bcryptjs.compare(password, hash);
    return samePassword;
}

export {hashPassword, comparePassword} 