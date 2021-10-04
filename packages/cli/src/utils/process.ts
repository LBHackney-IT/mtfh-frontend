import child, { SpawnOptions } from "child_process";

export const exec = (command: string, options: SpawnOptions = {}) => {
  const [program, ...args] = command.split(" ");
  return child.spawn(program, args, { shell: true, ...options });
};
