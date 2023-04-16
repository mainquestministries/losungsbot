{ pkgs, ... }:

{
  
  # https://devenv.sh/packages/
  packages = [  pkgs.git 
                pkgs.nodejs-18_x 
                pkgs.nodePackages.node-gyp-build 
                pkgs.gcc9
                pkgs.python310Full 
                pkgs.gnumake
                pkgs.python310Packages.gyp];

  # https://devenv.sh/scripts/
  scripts.update.exec = "npm ci";

  enterShell = ''
    echo Use update to update to the latest packages.
    echo Node Version: `node --version`
  '';

  processes = {
    node.exec= "npm run watch:start";
  };
  # See full reference at https://devenv.sh/reference/options/
}
