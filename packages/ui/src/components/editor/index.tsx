'use client';

import { Separator } from '../separator';
import { dragNDropExtension, emailExtensions } from './extensions';
import { slashItems, slashExtension } from './slash-items';
import {
  EditorRoot,
  EditorContent,
  EditorCommand,
  EditorCommandEmpty,
  EditorCommandItem,
  EditorCommandList,
  EditorBubble,
  type JSONContent,
} from 'novel';
import { handleCommandNavigation } from 'novel/extensions';
import {
  ButtonLinkAlignBlock,
  ImageAlignBlock,
  ImageBlock,
  LinkBlock,
  TextAlignBlock,
  TextFormatBlock,
  TextTypeBlock,
} from './bubble-blocks';
import { ScrollArea } from '../scroll-area';
import { Typo } from '../typo';
import { ImageResizer } from './custom-extensions/image-resizer';
import { isTextSelection } from '@tiptap/core';

interface EditorProp {
  initialValue?: JSONContent;
  onChange: (value: JSONContent) => void;
}

const Editor = ({ initialValue, onChange }: EditorProp) => {
  return (
    <EditorRoot>
      <EditorContent
        {...(initialValue && { initialContent: initialValue })}
        extensions={[...emailExtensions, ...dragNDropExtension, slashExtension]}
        editorProps={{
          handleDOMEvents: {
            keydown: (_view, event) => handleCommandNavigation(event),
          },
        }}
        onUpdate={({ editor }) => {
          onChange(editor.getJSON());
        }}
        slotAfter={<ImageResizer />}
      >
        <EditorBubble
          tippyOptions={{
            maxWidth: '500px',
          }}
          shouldShow={({ state, from, to, view, editor }) => {
            const { doc, selection } = state;
            const { empty } = selection;

            const isEmptyTextBlock =
              !doc.textBetween(from, to).length &&
              isTextSelection(state.selection);

            const hasEditorFocus = view.hasFocus();
            const notAllowedElements =
              editor.isActive('buttonLink') || editor.isActive('image');

            if (
              !hasEditorFocus ||
              empty ||
              isEmptyTextBlock ||
              !editor.isEditable ||
              notAllowedElements
            ) {
              return false;
            }

            return true;
          }}
        >
          <div className="flex flex-col gap-1 w-full p-1 rounded-md bg-muted border border-foreground/[0.07] shadow-md">
            <div className="flex items-center gap-1">
              <TextTypeBlock />
              <Separator
                orientation="vertical"
                className="h-7 bg-foreground/[0.07]"
              />
              <TextFormatBlock />
              <Separator
                orientation="vertical"
                className="h-7 bg-foreground/[0.07]"
              />
              <TextAlignBlock />
              <Separator
                orientation="vertical"
                className="h-7 bg-foreground/[0.07]"
              />
              <LinkBlock />
            </div>
          </div>
        </EditorBubble>
        <EditorBubble
          tippyOptions={{
            maxWidth: '500px',
          }}
          shouldShow={({ editor }) => editor.isActive('image')}
        >
          <div className="flex flex-col gap-1 w-full p-1 rounded-md bg-muted border border-foreground/[0.07] shadow-md">
            <div className="flex items-center gap-1">
              <ImageBlock />
              <Separator
                orientation="vertical"
                className="h-7 bg-foreground/[0.07]"
              />
              <ImageAlignBlock />
              <Separator
                orientation="vertical"
                className="h-7 bg-foreground/[0.07]"
              />
              <LinkBlock />
            </div>
          </div>
        </EditorBubble>
        <EditorBubble
          tippyOptions={{
            maxWidth: '500px',
          }}
          shouldShow={({ editor }) => editor.isActive('buttonLink')}
        >
          <div className="flex flex-col gap-1 w-full p-1 rounded-md bg-muted border border-foreground/[0.07] shadow-md">
            <div className="flex items-center gap-1">
              <TextFormatBlock options={['bold', 'italic', 'underline']} />
              <Separator
                orientation="vertical"
                className="h-7 bg-foreground/[0.07]"
              />
              <ButtonLinkAlignBlock />
              <Separator
                orientation="vertical"
                className="h-7 bg-foreground/[0.07]"
              />
              <LinkBlock buttonLink />
            </div>
          </div>
        </EditorBubble>

        <EditorCommand className="min-w-64 z-50 h-auto rounded-md p-1 bg-muted border border-foreground/[0.07] shadow-md transition-all">
          <ScrollArea
            className="max-h-[330px]"
            scrollBackground="bg-foreground/10"
            forceMount
          >
            <EditorCommandEmpty className="p-2 text-muted-foreground flex items-center">
              No results
            </EditorCommandEmpty>
            <EditorCommandList>
              {slashItems.map((item) => (
                <EditorCommandItem
                  value={item.title}
                  onCommand={(val) => item?.command?.(val)}
                  className="flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-foreground/10 hover:text-accent-foreground aria-selected:bg-foreground/10"
                  key={item.title}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-md border border-muted bg-background">
                    {item.icon}
                  </div>
                  <div className="flex flex-col">
                    <Typo variant={'sm'}>{item.title}</Typo>
                    <Typo variant={'mutedXs'}>{item.description}</Typo>
                  </div>
                </EditorCommandItem>
              ))}
            </EditorCommandList>
          </ScrollArea>
        </EditorCommand>
      </EditorContent>
    </EditorRoot>
  );
};

export type { JSONContent };

export default Editor;
