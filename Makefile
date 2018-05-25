remove-build:
	-rm -rf dist

release-qa:
	-git branch -D qa
	git checkout -b qa
	git add -f dist
	git commit -m "QA build"
	git push -f origin qa
	git checkout -
	git push
	git push --tags
