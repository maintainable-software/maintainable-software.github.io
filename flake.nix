{
  description = "Jekyll/GitHub Pages dev shell";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  };

  outputs = { self, nixpkgs }:
    let
      systems = [ "x86_64-linux" "aarch64-linux" ];
      forAllSystems = f:
        nixpkgs.lib.genAttrs systems (system:
          f {
            pkgs = import nixpkgs { inherit system; };
          });
    in {
      devShells = forAllSystems ({ pkgs }: {
        default = pkgs.mkShell {
          packages = with pkgs; [
            ruby_3_3
            git

            gcc
            gnumake
            pkg-config

            libffi
            openssl
            zlib
            libyaml
            libxml2
            libxslt
          ];

          shellHook = ''
            export LANG=C.UTF-8
            export LC_ALL=C.UTF-8

            export BUNDLE_PATH="$PWD/.bundle/vendor"
            export BUNDLE_BIN="$PWD/.bundle/vendor/bin"
            export BUNDLE_APP_CONFIG="$PWD/.bundle/config"
            export GEM_HOME="$PWD/.bundle/vendor"
            export GEM_PATH="$GEM_HOME"
            export PATH="$BUNDLE_BIN:$PATH"

            export BUNDLE_BUILD__NOKOGIRI="--use-system-libraries"

            echo "Ruby:    $(ruby -v)"
            echo "Bundler: $(bundle -v)"
          '';
        };
      });
    };
}
