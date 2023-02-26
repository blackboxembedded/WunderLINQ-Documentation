#!/bin/bash
#
# Generate translated documentation
#

for LANGS in `ls -1 po`
do
	LANG=$(echo $LANGS | cut -d'.' -f1)
	for TEMPLATES in `ls -1 templates`
	do
		if [ -d "docs/$LANG" ] 
		then
    			echo "Directory exists: $LANG"
		else
			echo "Creating a directory: $LANG"
			mkdir -p docs/$LANG/images-localized
		fi

		# Translate templates
		po2html --threshold=95 po/$LANGS -t templates/$TEMPLATES docs/$LANG/$TEMPLATES
		
		# Copy base localized images
		cp -rpf images-localized/en/* docs/$LANG/images-localized/
		
		# Copy any localized images for the language
		cp -rpf images-localized/$LANG/* docs/$LANG/images-localized/
	done
done
