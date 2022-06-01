import childProcess from "child_process";
import { promisify } from "util";
import { run } from "./setup";

const exec = promisify(childProcess.exec);

async function main() {
  try {
    const { stdout: gitEmail } = await exec(
      `git config --global --get user.email`
    );

    if (!gitEmail.trim().length) {
      await exec(`git config --global user.email fairdataihub@gmail.com`);
      await exec(`git config --global user.name fairdataihub-bot`);
    }
  } catch (err) {
    await exec(`git config --global user.email fairdataihub@gmail.com`);
    await exec(`git config --global user.name fairdataihub-bot`);
  }

  await run({
    githubUserName: "fairdataihub-bot",
    packageName: "psychic-broccoli",
    userMail: "fairdataihub@gmail.com",
  });

  try {
    await test();
  } catch (err) {
    throw err;
  } finally {
    await restore();
  }
}

async function test() {
  await testNoGrep("gjuchault");
  await testNoGrep("typescript-library-starter");
  await testNoGrep("template");
}

async function restore() {
  await exec(`git reset HEAD~ && git checkout . && git clean -df`);

  await exec(
    `git remote add origin git@github.com:fairdataihub/psychic-broccoli.git`
  );

  await exec(`npm install`);
}

async function testNoGrep(pattern: string) {
  try {
    await exec(
      `grep -r "${pattern}" --exclude-dir=node_modules --exclude-dir=.git --exclude=README.md .`
    );
  } catch (err) {
    if (err.stderr === "") {
      return;
    }

    throw err;
  }
}

if (require.main === module) {
  main();
}
