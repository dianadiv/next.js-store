import { avataaars } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import Image from 'next/image';

const UserAvatar = ({ seed }: { seed: string }) => {
  const avatar = createAvatar(avataaars, {
    seed: seed,
    radius: 30,
    backgroundColor: ["white"]
  });
  const svg = avatar.toString();
  const avatarUrl = `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;

  return (
    <Image alt='Logo Image' src={avatarUrl} width={50} height={50} />
  )
}

export default UserAvatar;