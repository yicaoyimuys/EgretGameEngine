#!/usr/bin/env bash

TextureMerger=/Applications/TextureMerger.app/Contents/MacOS/TextureMerger
SourcePath=($1)
TargetPath=($2)
ActionName=($3)

${TextureMerger} -p ${SourcePath} -o ${TargetPath}/${ActionName}_0.json -e "/0.*.(jpg|png)"
${TextureMerger} -p ${SourcePath} -o ${TargetPath}/${ActionName}_1.json -e "/1.*.(jpg|png)"
${TextureMerger} -p ${SourcePath} -o ${TargetPath}/${ActionName}_2.json -e "/2.*.(jpg|png)"
${TextureMerger} -p ${SourcePath} -o ${TargetPath}/${ActionName}_3.json -e "/3.*.(jpg|png)"
${TextureMerger} -p ${SourcePath} -o ${TargetPath}/${ActionName}_4.json -e "/4.*.(jpg|png)"