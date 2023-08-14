import prisma from '../configs/prisma';

export default async function findOrCreateUser(id: string) {
  const findedUser = await prisma.user.findUnique({where: {id}});
  if (findedUser) {
    return findedUser;
  }

  const createdUser = await prisma.user.create({data: {id}});
  return createdUser;
}
